import { defineComponent, h } from 'vue'
import { ElContainer } from 'element-plus'

// UcLayout：布局容器
// 统一 API：direction(vertical|horizontal，默认 vertical) + 默认插槽
// 注意：ElContainer 的方向自动探测依赖直接子 vnode 的 name 为 ElHeader/ElFooter，
// 统一层子组件是 UcLayoutHeader 等包装组件，探测必然失效，故始终显式传 direction
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
    return () => h(ElContainer, { direction: props.direction, ...attrs }, slots)
  },
})
