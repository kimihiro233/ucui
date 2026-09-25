import { defineComponent, h } from 'vue'
import { ElDatePicker } from 'element-plus'

export default defineComponent({
  name: 'UcDatePicker',
  inheritAttrs: false,
  props: {
    // 绑定值为格式化后的字符串
    modelValue: { type: String, default: '' },
    format: { type: String, default: 'YYYY-MM-DD' },
    clearable: { type: Boolean, default: true },
    disabled: Boolean,
    placeholder: String,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElDatePicker,
        {
          type: 'date',
          modelValue: props.modelValue,
          format: props.format,
          // element 需要 valueFormat 才能让绑定值是字符串而非 Date
          valueFormat: props.format,
          clearable: props.clearable,
          disabled: props.disabled,
          placeholder: props.placeholder,
          ...attrs,
          'onUpdate:modelValue': (v) => emit('update:modelValue', v ?? ''),
          onChange: (v) => emit('change', v ?? ''),
        },
        slots,
      )
  },
})
