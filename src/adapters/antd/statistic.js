import { defineComponent, h } from 'vue'
import { Statistic } from 'ant-design-vue'

export default defineComponent({
  name: 'UcStatistic',
  inheritAttrs: false,
  props: {
    title: String,
    value: { type: [Number, String], default: 0 },
    precision: Number,
    prefix: String,
    suffix: String,
  },
  setup(props, { attrs }) {
    return () =>
      h(Statistic, {
        title: props.title,
        value: props.value,
        precision: props.precision,
        prefix: props.prefix,
        suffix: props.suffix,
        ...attrs,
      })
  },
})
