import { defineComponent, h } from 'vue'
import { Row } from 'ant-design-vue'

// UcRow：栅格行
// 统一 API：gutter(number，元素间距 px)/justify/align(top|middle|bottom) + 默认插槽
// antd 原生 gutter 同名，prop 名与 element 一致直映（数组 gutter 为 antd 增强能力，
// 统一层仅承诺 number；数组经 attrs 逃生舱仍可用但不保证 element 行为）
export default defineComponent({
  name: 'UcRow',
  inheritAttrs: false,
  props: {
    gutter: { type: Number, default: 0 },
    justify: {
      type: String,
      default: 'start',
      validator: (v) =>
        ['start', 'center', 'end', 'space-around', 'space-between', 'space-evenly'].includes(v),
    },
    align: {
      type: String,
      default: '',
      validator: (v) => ['', 'top', 'middle', 'bottom', 'stretch'].includes(v),
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        Row,
        {
          gutter: props.gutter,
          justify: props.justify,
          ...(props.align ? { align: props.align } : {}),
          ...attrs,
        },
        { default: slots.default },
      )
  },
})
