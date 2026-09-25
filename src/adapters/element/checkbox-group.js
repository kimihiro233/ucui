import { defineComponent, h } from 'vue'
import { ElCheckboxGroup } from 'element-plus'

export default defineComponent({
  name: 'UcCheckboxGroup',
  inheritAttrs: false,
  props: {
    modelValue: { type: Array, default: () => [] },
    // 数据驱动：[{ label, value, disabled? }]
    options: { type: Array, default: () => [] },
    disabled: Boolean,
    // 最少/最多勾选数（antd 侧不支持，适配器丢弃）
    min: { type: Number, default: undefined },
    max: { type: Number, default: undefined },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(ElCheckboxGroup, {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => emit('update:modelValue', value),
        options: props.options,
        disabled: props.disabled,
        min: props.min,
        max: props.max,
        ...attrs,
        onChange: (value) => emit('change', value),
      })
  },
})
