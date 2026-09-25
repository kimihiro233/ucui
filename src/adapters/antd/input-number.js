import { defineComponent, h } from 'vue'
import { InputNumber } from 'ant-design-vue'

export default defineComponent({
  name: 'UcInputNumber',
  inheritAttrs: false,
  props: {
    modelValue: { type: Number, default: undefined },
    min: Number,
    max: Number,
    step: { type: Number, default: 1 },
    precision: Number,
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        InputNumber,
        {
          // antd 用 value
          value: props.modelValue,
          min: props.min,
          max: props.max,
          step: props.step,
          precision: props.precision,
          disabled: props.disabled,
          ...attrs,
          // antd onChange 直接给值
          onChange: (v) => {
            emit('update:modelValue', v ?? undefined)
            emit('change', v ?? undefined)
          },
        },
        slots,
      )
  },
})
