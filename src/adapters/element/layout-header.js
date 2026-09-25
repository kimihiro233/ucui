import { defineComponent, h } from 'vue'
import { ElHeader } from 'element-plus'

// UcLayoutHeader：顶栏
// 统一 API：height(number|string，默认 60，number 自动补 px) + 默认插槽
// element 通过 CSS 变量 --el-header-height 控制高度
const toCssSize = (v) => (typeof v === 'number' ? `${v}px` : v)

export default defineComponent({
  name: 'UcLayoutHeader',
  inheritAttrs: false,
  props: {
    height: { type: [String, Number], default: 60 },
  },
  setup(props, { slots, attrs }) {
    return () => h(ElHeader, { height: toCssSize(props.height), ...attrs }, slots)
  },
})
