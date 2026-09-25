import { defineComponent, h } from 'vue'
import { ElTag } from 'element-plus'

// 统一 type -> element type 映射（element 无 default 档，用 info 灰色兜底）
const typeMap = {
  default: 'info',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
}

export default defineComponent({
  name: 'UcTag',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (v) => ['default', 'success', 'warning', 'danger', 'info'].includes(v),
    },
    closable: Boolean,
  },
  emits: ['close'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElTag,
        {
          type: typeMap[props.type],
          closable: props.closable,
          ...attrs,
          onClose: () => emit('close'),
        },
        slots,
      )
  },
})
