import { defineComponent, h } from 'vue'
import { Slider } from 'ant-design-vue'

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
      h(Slider, {
        // antd 的 Slider 使用 v-model:value
        value: props.modelValue,
        'onUpdate:value': (value) => emit('update:modelValue', value),
        min: props.min,
        max: props.max,
        step: props.step,
        disabled: props.disabled,
        ...attrs,
        onChange: (value) => emit('change', value),
      })
  },
})
