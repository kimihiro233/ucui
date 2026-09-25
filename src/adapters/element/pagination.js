import { defineComponent, h } from 'vue'
import { ElPagination } from 'element-plus'

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
      h(ElPagination, {
        currentPage: props.modelValue,
        'onUpdate:currentPage': (page) => emit('update:modelValue', page),
        total: props.total,
        pageSize: props.pageSize,
        ...attrs,
        onChange: (page) => emit('change', page),
      })
  },
})
