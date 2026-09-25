import { defineComponent, h } from 'vue'
import { ElTimePicker } from 'element-plus'

export default defineComponent({
  name: 'UcTimePicker',
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: '' },
    format: { type: String, default: 'HH:mm:ss' },
    clearable: { type: Boolean, default: true },
    disabled: Boolean,
    placeholder: String,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(ElTimePicker, {
        modelValue: props.modelValue,
        format: props.format,
        valueFormat: props.format,
        clearable: props.clearable,
        disabled: props.disabled,
        placeholder: props.placeholder,
        ...attrs,
        'onUpdate:modelValue': (v) => emit('update:modelValue', v ?? ''),
        onChange: (v) => emit('change', v ?? ''),
      }, slots)
  },
})
