import { defineComponent, h } from 'vue'
import { ElCheckbox } from 'element-plus'

export default defineComponent({
  name: 'UcCheckbox',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElCheckbox,
        {
          modelValue: props.modelValue,
          'onUpdate:modelValue': (value) => emit('update:modelValue', value),
          disabled: props.disabled,
          ...attrs,
          onChange: (value) => emit('change', value),
        },
        slots,
      )
  },
})
