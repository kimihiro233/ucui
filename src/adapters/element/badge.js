import { defineComponent, h } from 'vue'
import { ElBadge } from 'element-plus'

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
        ElBadge,
        {
          value: props.value,
          max: props.max,
          // element-plus 的圆点 prop 叫 isDot
          isDot: props.dot,
          ...attrs,
        },
        slots,
      )
  },
})
