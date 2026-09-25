import { defineComponent, h } from 'vue'
import { Select } from 'ant-design-vue'
import { sizeMap, sizePropDef } from './shared'

// 统一 options 结构：[{ label, value, disabled? }]，antd 原生 options 正好一致
export default defineComponent({
  name: 'UcSelect',
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number, Boolean], default: undefined },
    options: { type: Array, default: () => [] },
    placeholder: String,
    clearable: Boolean,
    disabled: Boolean,
    size: sizePropDef,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(Select, {
        // antd 的 Select 使用 v-model:value，归一化为标准 modelValue
        value: props.modelValue,
        'onUpdate:value': (value) => emit('update:modelValue', value),
        options: props.options,
        placeholder: props.placeholder,
        allowClear: props.clearable,
        disabled: props.disabled,
        size: sizeMap[props.size],
        ...attrs,
        onChange: (value) => emit('change', value),
      })
  },
})
