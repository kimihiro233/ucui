import { defineComponent, h } from 'vue'
import { Progress } from 'ant-design-vue'

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
      h(Progress, {
        // antd 的 percent 对应统一层的 percentage
        percent: props.percentage,
        ...attrs,
      })
  },
})
