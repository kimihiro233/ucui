import { defineComponent, h } from 'vue'
import { ElAnchor, ElAnchorLink } from 'element-plus'

// UcAnchor：锚点
// 统一 API：
//   items=[{key?,href,title,children?}] 数据驱动（仅 vertical 支持 children 嵌套）
//   direction(vertical|horizontal，默认 vertical) / offset(默认 0) / bound(默认 15) /
//   container(CSS 选择器字符串)
//   @change(href) @click(href, event)
// element：ElAnchorLink 递归；注意嵌套子链接走 sub-link 具名插槽（default 是标题）
export default defineComponent({
  name: 'UcAnchor',
  inheritAttrs: false,
  props: {
    items: { type: Array, default: () => [] },
    direction: {
      type: String,
      default: 'vertical',
      validator: (v) => ['vertical', 'horizontal'].includes(v),
    },
    offset: { type: Number, default: 0 },
    bound: { type: Number, default: 15 },
    container: { type: String, default: '' },
  },
  emits: ['change', 'click'],
  setup(props, { emit, attrs }) {
    const renderLinks = (list) =>
      list.map((item) =>
        h(
          ElAnchorLink,
          { key: item.key || item.href, href: item.href, title: item.title },
          item.children && item.children.length
            ? { 'sub-link': () => renderLinks(item.children) }
            : null,
        ),
      )

    return () =>
      h(
        ElAnchor,
        {
          offset: props.offset,
          bound: props.bound,
          direction: props.direction,
          ...(props.container ? { container: props.container } : {}),
          ...attrs,
          // element click 参数顺序是 (event, href)，统一为 (href, event)
          onChange: (href) => emit('change', href),
          onClick: (event, href) => emit('click', href, event),
        },
        () => renderLinks(props.items),
      )
  },
})
