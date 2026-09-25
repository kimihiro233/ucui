import { defineComponent, h } from 'vue'
import { Alert } from 'ant-design-vue'

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
    closable: Boolean,
  },
  emits: ['close'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        Alert,
        {
          // antd 的 message 对应统一层的 title
          message: props.title,
          type: props.type,
          closable: props.closable,
          ...attrs,
          onClose: () => emit('close'),
        },
        // antd 的默认插槽内容走 description 具名插槽
        { description: slots.default || slots.description },
      )
  },
})
