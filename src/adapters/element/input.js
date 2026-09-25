import { defineComponent, h } from 'vue'
import { ElInput } from 'element-plus'
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
        ElInput,
        {
          modelValue: props.modelValue,
          'onUpdate:modelValue': (value) => emit('update:modelValue', value),
          placeholder: props.placeholder,
          clearable: props.clearable,
          disabled: props.disabled,
          readonly: props.readonly,
          size: sizeMap[props.size],
          ...attrs,
          onChange: (value) => emit('change', value),
          onInput: (value) => emit('input', value),
          onFocus: (event) => emit('focus', event),
          onBlur: (event) => emit('blur', event),
        },
        slots,
      )
  },
})
