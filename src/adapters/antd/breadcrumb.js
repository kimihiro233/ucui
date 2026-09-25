import { defineComponent, h } from 'vue'
import { Breadcrumb } from 'ant-design-vue'

// antd 的 BreadcrumbItem 即使传 href prop 也不会渲染到 a 标签上（源码漏拼），
// 因此用 routes + 自定义 itemRender 数据驱动，保证 href 与统一层 to 一致
export default defineComponent({
  name: 'UcBreadcrumb',
  inheritAttrs: false,
  props: {
    items: { type: Array, default: () => [] },
    separator: { type: String, default: '/' },
  },
  setup(props, { attrs }) {
    return () => {
      const routes = props.items.map((item) => ({
        // path 仅用于内部路径累积，给个占位值即可
        path: item.to || `__uc_${item.label}`,
        breadcrumbName: item.label,
      }))
      const itemRender = ({ route, routes: allRoutes }) => {
        const index = allRoutes.indexOf(route)
        const isLast = index === allRoutes.length - 1
        return isLast
          ? h('span', route.breadcrumbName)
          : h('a', { href: props.items[index].to }, route.breadcrumbName)
      }
      return h(Breadcrumb, {
        routes,
        itemRender,
        separator: props.separator,
        ...attrs,
      })
    }
  },
})
