import { defineComponent, h } from 'vue'
import { Layout } from 'ant-design-vue'

// UcLayoutSider：侧边栏
// 统一 API：width(number|string，默认 300) + 默认插槽
// antd Sider 原生支持 width(number|string)；折叠能力（collapsible/collapsed/
// collapsedWidth/breakpoint/theme/trigger + @collapse/@breakpoint）为 antd 单边增强，
// 统一层不声明，经 attrs 逃生舱透传
export default defineComponent({
  name: 'UcLayoutSider',
  inheritAttrs: false,
  props: {
    width: { type: [String, Number], default: 300 },
  },
  setup(props, { slots, attrs }) {
    return () => h(Layout.Sider, { width: props.width, ...attrs }, slots)
  },
})
