import { defineComponent, h } from 'vue'
import { Spin } from 'ant-design-vue'

export default defineComponent({
  name: 'UcSpin',
  inheritAttrs: false,
  props: {
    spinning: { type: Boolean, default: false },
    size: {
      type: String,
      default: 'default',
      validator: (v) => ['large', 'default', 'small'].includes(v),
    },
    tip: String,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        Spin,
        {
          spinning: props.spinning,
          size: props.size,
          tip: props.tip,
          ...attrs,
        },
        slots,
      )
  },
})
