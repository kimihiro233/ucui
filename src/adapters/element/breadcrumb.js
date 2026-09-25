import { defineComponent, h } from 'vue'
import { ElBreadcrumb, ElBreadcrumbItem } from 'element-plus'

export default defineComponent({
  name: 'UcBreadcrumb',
  inheritAttrs: false,
  props: {
    items: { type: Array, default: () => [] },
    separator: { type: String, default: '/' },
  },
  setup(props, { attrs }) {
    return () =>
      h(
        ElBreadcrumb,
        { separator: props.separator, ...attrs },
        () =>
          props.items.map((item) =>
            h(
              ElBreadcrumbItem,
              // element 用 to 做路由跳转
              { to: item.to, replace: item.replace },
              { default: () => item.label },
            ),
          ),
      )
  },
})
