import { defineComponent, h } from 'vue'
import { ElRow } from 'element-plus'

// UcRow：栅格行
// 统一 API：gutter(number，元素间距 px)/justify/align(top|middle|bottom) + 默认插槽
// element 2.14.6 的 gutter 只支持 number（数组 [h,v] 是 antd 独有，统一层不收）
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
      validator: (v) => ['', 'top', 'middle', 'bottom'].includes(v),
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ElRow,
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
