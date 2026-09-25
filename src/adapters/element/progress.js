import { defineComponent, h } from 'vue'
import { ElProgress } from 'element-plus'

export default defineComponent({
  name: 'UcProgress',
  inheritAttrs: false,
  props: {
    percentage: {
      type: Number,
      default: 0,
      validator: (v) => v >= 0 && v <= 100,
    },
  },
  setup(props, { attrs }) {
    return () =>
      h(ElProgress, {
        percentage: props.percentage,
        ...attrs,
      })
  },
})
