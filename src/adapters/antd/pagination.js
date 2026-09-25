import { defineComponent, h } from 'vue'
import { Pagination } from 'ant-design-vue'

export default defineComponent({
  name: 'UcPagination',
  inheritAttrs: false,
  props: {
    modelValue: { type: Number, default: 1 },
    total: { type: Number, default: 0 },
    pageSize: { type: Number, default: 10 },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(Pagination, {
        // antd 的 current 对应统一层的 modelValue
        current: props.modelValue,
        'onUpdate:current': (page) => emit('update:modelValue', page),
        total: props.total,
        pageSize: props.pageSize,
        ...attrs,
        onChange: (page) => emit('change', page),
      })
  },
})
