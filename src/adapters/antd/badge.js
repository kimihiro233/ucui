import { defineComponent, h } from 'vue'
import { Badge } from 'ant-design-vue'

export default defineComponent({
  name: 'UcBadge',
  inheritAttrs: false,
  props: {
    value: { type: [Number, String], default: '' },
    max: { type: Number, default: undefined },
    dot: Boolean,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        Badge,
        {
          // antd 的 count 对应统一层的 value，overflowCount 对应 max
          count: props.value,
          overflowCount: props.max,
          dot: props.dot,
          ...attrs,
        },
        slots,
      )
  },
})
