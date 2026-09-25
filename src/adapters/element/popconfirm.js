import { defineComponent, h } from 'vue'
import { ElPopconfirm } from 'element-plus'

export default defineComponent({
  name: 'UcPopconfirm',
  inheritAttrs: false,
  props: {
    title: String,
    // 统一命名；element 侧叫 confirmButtonText/cancelButtonText，antd 侧叫 okText/cancelText
    confirmText: String,
    cancelText: String,
  },
  emits: ['confirm', 'cancel'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElPopconfirm,
        {
          title: props.title,
          confirmButtonText: props.confirmText,
          cancelButtonText: props.cancelText,
          ...attrs,
          onConfirm: (e) => emit('confirm', e),
          onCancel: (e) => emit('cancel', e),
        },
        // 与 ElPopover 一致：触发元素必须走 reference 具名插槽
        { reference: slots.default },
      )
  },
})
