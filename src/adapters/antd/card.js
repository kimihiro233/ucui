import { defineComponent, h } from 'vue'
import { Card } from 'ant-design-vue'

export default defineComponent({
  name: 'UcCard',
  inheritAttrs: false,
  props: {
    title: String,
    bordered: { type: Boolean, default: true },
    hoverable: Boolean,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        Card,
        {
          title: props.title,
          bordered: props.bordered,
          hoverable: props.hoverable,
          ...attrs,
        },
        slots,
      )
  },
})
