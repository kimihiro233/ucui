import { defineComponent, h } from 'vue'
import { Calendar } from 'ant-design-vue'

export default defineComponent({
  name: 'UcCalendar',
  inheritAttrs: false,
  props: {
    // 绑定值为格式化字符串，antd Calendar 支持 valueFormat 直接绑定字符串
    modelValue: { type: String, default: '' },
    format: { type: String, default: 'YYYY-MM-DD' },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(Calendar, {
        value: props.modelValue,
        valueFormat: props.format,
        ...attrs,
        'onUpdate:value': (v) => emit('update:modelValue', v ?? ''),
        onChange: (v) => emit('change', v ?? ''),
      }, slots)
  },
})
