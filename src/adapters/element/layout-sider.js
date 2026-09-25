import { defineComponent, h } from 'vue'
import { ElAside } from 'element-plus'

// UcLayoutSider：侧边栏
// 统一 API：width(number|string，默认 300，number 自动补 px) + 默认插槽
// element ElAside 只有 width（CSS 变量 --el-aside-width），无折叠能力；
// collapsible/collapsed/breakpoint/theme 等是 antd Sider 单边能力，
// 经 attrs 传过来时在 element 侧显式剔除，避免污染到 <aside> DOM 属性
const toCssSize = (v) => (typeof v === 'number' ? `${v}px` : v)

// antd Sider 单边 props/事件，element 不透传
const ANTD_ONLY_KEYS = [
  'collapsible',
  'collapsed',
  'defaultCollapsed',
  'collapsedWidth',
  'reverseArrow',
  'zeroWidthTriggerStyle',
  'trigger',
  'breakpoint',
  'theme',
  'onCollapse',
  'onBreakpoint',
  'onUpdate:collapsed',
]

export default defineComponent({
  name: 'UcLayoutSider',
  inheritAttrs: false,
  props: {
    width: { type: [String, Number], default: 300 },
  },
  setup(props, { slots, attrs }) {
    return () => {
      const restAttrs = { ...attrs }
      ANTD_ONLY_KEYS.forEach((key) => delete restAttrs[key])
      return h(ElAside, { width: toCssSize(props.width), ...restAttrs }, slots)
    }
  },
})
