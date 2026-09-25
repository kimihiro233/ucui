import { defineComponent, h } from 'vue'
import { ElRadioGroup } from 'element-plus'

export default defineComponent({
  name: 'UcRadioGroup',
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number, Boolean], default: undefined },
    // 数据驱动：[{ label, value, disabled? }]
    options: { type: Array, default: () => [] },
    disabled: Boolean,
    size: { type: String, default: 'default', validator: (v) => ['large', 'default', 'small'].includes(v) },
    // 按钮形态（element type=button / antd optionType=button）
    type: { type: String, default: 'radio', validator: (v) => ['radio', 'button'].includes(v) },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(ElRadioGroup, {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => emit('update:modelValue', value),
        options: props.options,
        disabled: props.disabled,
        size: props.size,
        type: props.type,
        ...attrs,
        // element 的 change 在 nextTick 后触发，参数为新值
        onChange: (value) => emit('change', value),
      })
  },
})
