import { defineComponent, h } from 'vue'
import { ElCalendar } from 'element-plus'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'UcCalendar',
  inheritAttrs: false,
  props: {
    // 绑定值为格式化字符串，element ElCalendar 只接受 Date，适配层负责转换
    modelValue: { type: String, default: '' },
    format: { type: String, default: 'YYYY-MM-DD' },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(ElCalendar, {
        modelValue: props.modelValue ? dayjs(props.modelValue, props.format).toDate() : undefined,
        ...attrs,
        'onUpdate:modelValue': (v) => {
          const s = v ? dayjs(v).format(props.format) : ''
          emit('update:modelValue', s)
        },
        onChange: (v) => emit('change', v ? dayjs(v).format(props.format) : ''),
      }, slots)
  },
})
