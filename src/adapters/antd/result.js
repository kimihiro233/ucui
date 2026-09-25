import { defineComponent, h } from 'vue'
import { Result } from 'ant-design-vue'

export default defineComponent({
  name: 'UcResult',
  inheritAttrs: false,
  props: {
    status: {
      type: String,
      default: 'info',
      validator: (v) => ['success', 'error', 'warning', 'info'].includes(v),
    },
    title: String,
    subTitle: String,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        Result,
        {
          status: props.status,
          title: props.title,
          subTitle: props.subTitle,
          ...attrs,
        },
        { extra: slots.extra },
      )
  },
})
