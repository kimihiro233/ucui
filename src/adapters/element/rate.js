import { defineComponent, h } from 'vue'
import { ElRate } from 'element-plus'

export default defineComponent({
  name: 'UcRate',
  inheritAttrs: false,
  props: {
    modelValue: { type: Number, default: 0 },
    max: { type: Number, default: 5 },
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(ElRate, {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => emit('update:modelValue', value),
        max: props.max,
        disabled: props.disabled,
        ...attrs,
        onChange: (value) => emit('change', value),
      })
  },
})
