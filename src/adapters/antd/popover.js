import { defineComponent, h } from 'vue'
import { Popover } from 'ant-design-vue'

export default defineComponent({
  name: 'UcPopover',
  inheritAttrs: false,
  props: {
    title: String,
    content: String,
    trigger: {
      type: String,
      default: 'hover',
      validator: (v) => ['hover', 'click', 'focus'].includes(v),
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        Popover,
        {
          title: props.title,
          content: props.content,
          trigger: props.trigger,
          ...attrs,
        },
        slots,
      )
  },
})
