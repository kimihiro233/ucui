import { defineComponent, h } from 'vue'
import { Input } from 'ant-design-vue'
import { sizeMap, sizePropDef } from './shared'

export default defineComponent({
  name: 'UcInput',
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number], default: '' },
    placeholder: String,
    clearable: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    size: sizePropDef,
  },
  emits: ['update:modelValue', 'change', 'input', 'focus', 'blur'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        Input,
        {
          // antd 的 Input 使用 v-model:value，归一化为标准 modelValue
          value: props.modelValue,
          'onUpdate:value': (value) => emit('update:modelValue', value),
          placeholder: props.placeholder,
          allowClear: props.clearable, // antd 里叫 allowClear
          disabled: props.disabled,
          readonly: props.readonly,
          size: sizeMap[props.size],
          ...attrs,
          onChange: (event) => emit('change', event.target.value),
          onInput: (event) => emit('input', event.target.value),
          onFocus: (event) => emit('focus', event),
          onBlur: (event) => emit('blur', event),
        },
        slots,
      )
  },
})
