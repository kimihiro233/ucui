import { defineComponent, h } from 'vue'
import { Popconfirm } from 'ant-design-vue'

export default defineComponent({
  name: 'UcPopconfirm',
  inheritAttrs: false,
  props: {
    title: String,
    confirmText: String,
    cancelText: String,
  },
  emits: ['confirm', 'cancel'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        Popconfirm,
        {
          title: props.title,
          okText: props.confirmText,
          cancelText: props.cancelText,
          ...attrs,
          onConfirm: (e) => emit('confirm', e),
          onCancel: (e) => emit('cancel', e),
        },
        // antd Popconfirm 默认插槽即触发元素
        slots,
      )
  },
})
