import { defineComponent, h } from 'vue'
import { ElInputNumber } from 'element-plus'

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
        ElInputNumber,
        {
          modelValue: props.modelValue,
          min: props.min,
          max: props.max,
          step: props.step,
          precision: props.precision,
          disabled: props.disabled,
          ...attrs,
          'onUpdate:modelValue': (v) => emit('update:modelValue', v),
          onChange: (v) => emit('change', v),
        },
        slots,
      )
  },
})
