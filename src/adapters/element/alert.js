import { defineComponent, h } from 'vue'
import { ElAlert } from 'element-plus'

export default defineComponent({
  name: 'UcAlert',
  inheritAttrs: false,
  props: {
    title: String,
    type: {
      type: String,
      default: 'info',
      validator: (v) => ['info', 'success', 'warning', 'error'].includes(v),
    },
    // 统一默认不可关闭（取 antd 的显式 opt-in 语义）
    closable: Boolean,
  },
  emits: ['close'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElAlert,
        {
          title: props.title,
          type: props.type,
          closable: props.closable,
          ...attrs,
          onClose: () => emit('close'),
        },
        slots,
      )
  },
})
