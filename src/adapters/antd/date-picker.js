import { defineComponent, h } from 'vue'
import { DatePicker } from 'ant-design-vue'

export default defineComponent({
  name: 'UcDatePicker',
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: '' },
    format: { type: String, default: 'YYYY-MM-DD' },
    clearable: { type: Boolean, default: true },
    disabled: Boolean,
    placeholder: String,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, attrs }) {
    return () =>
      h(
        DatePicker,
        {
          // antd 用 value；valueFormat 让 v-model 绑定字符串而非 dayjs 对象
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
        },
        slots,
      )
  },
})
