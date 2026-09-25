import { defineComponent, h } from 'vue'
import { ElFooter } from 'element-plus'

// UcLayoutFooter：底栏
// 统一 API：height(number|string，默认 60，number 自动补 px) + 默认插槽
// element 通过 CSS 变量 --el-footer-height 控制高度
const toCssSize = (v) => (typeof v === 'number' ? `${v}px` : v)

export default defineComponent({
  name: 'UcLayoutFooter',
  inheritAttrs: false,
  props: {
    height: { type: [String, Number], default: 60 },
  },
  setup(props, { slots, attrs }) {
    return () => h(ElFooter, { height: toCssSize(props.height), ...attrs }, slots)
  },
})
