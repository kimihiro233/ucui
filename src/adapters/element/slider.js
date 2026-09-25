import { defineComponent, h } from 'vue'
import { ElSlider } from 'element-plus'

export default defineComponent({
  name: 'UcSlider',
  inheritAttrs: false,
  props: {
    modelValue: { type: Number, default: 0 },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(ElSlider, {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => emit('update:modelValue', value),
        min: props.min,
        max: props.max,
        step: props.step,
        disabled: props.disabled,
        ...attrs,
        onChange: (value) => emit('change', value),
      })
  },
})
