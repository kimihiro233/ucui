import { defineComponent, h } from 'vue'
import { Tag } from 'ant-design-vue'

// 统一 type -> antd 预设色映射（danger->error；info 归入 default 灰色）
const typeMap = {
  default: undefined,
  success: 'success',
  warning: 'warning',
  danger: 'error',
  info: 'default',
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
        Tag,
        {
          color: typeMap[props.type],
          closable: props.closable,
          ...attrs,
          onClose: (e) => emit('close', e),
        },
        slots,
      )
  },
})
