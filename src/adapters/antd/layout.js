import { defineComponent, h } from 'vue'
import { Layout } from 'ant-design-vue'

// UcLayout：布局容器
// 统一 API：direction(vertical|horizontal，默认 vertical) + 默认插槽
// antd Layout 无 direction prop：含 Sider 的横向布局通过 hasSider 标记
// （虽然 Sider 可经 inject 自动注册，但统一层子组件结构下统一显式映射，行为确定）
export default defineComponent({
  name: 'UcLayout',
  inheritAttrs: false,
  props: {
    direction: {
      type: String,
      default: 'vertical',
      validator: (v) => ['vertical', 'horizontal'].includes(v),
    },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(Layout, { hasSider: props.direction === 'horizontal', ...attrs }, slots)
  },
})
