import { defineComponent, h } from 'vue'
import { TimePicker } from 'ant-design-vue'

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
      h(TimePicker, {
        value: props.modelValue,
        valueFormat: props.format,
        format: props.format,
        allowClear: props.clearable,
        disabled: props.disabled,
        placeholder: props.placeholder,
        ...attrs,
        onChange: (v) => {
          emit('update:modelValue', v ?? '')
          emit('change', v ?? '')
        },
      }, slots)
  },
})
