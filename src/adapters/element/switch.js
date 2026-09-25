import { defineComponent, h } from 'vue'
import { ElSwitch } from 'element-plus'

export default defineComponent({
  name: 'UcSwitch',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    disabled: Boolean,
    loading: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(ElSwitch, {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => emit('update:modelValue', value),
        disabled: props.disabled,
        loading: props.loading,
        ...attrs,
        onChange: (value) => emit('change', value),
      })
  },
})
