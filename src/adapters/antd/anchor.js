import { defineComponent, h } from 'vue'
import { Anchor } from 'ant-design-vue'

// UcAnchor：锚点
// 统一 API：
//   items=[{key?,href,title,children?}] 数据驱动（仅 vertical 支持 children 嵌套）
//   direction(vertical|horizontal，默认 vertical) / offset(默认 0) / bound(默认 15) /
//   container(CSS 选择器字符串)
//   @change(href) @click(href, event)
// antd 原生支持 items（内部 createNestedLink 递归渲染），offset→offsetTop、bound→bounds；
// container 字符串选择器转换为 getContainer 函数
const mapItems = (list) =>
  list.map((item) => ({
    key: item.key || item.href,
    href: item.href,
    title: item.title,
    ...(item.children && item.children.length
      ? { children: mapItems(item.children) }
      : {}),
  }))

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
    return () =>
      h(Anchor, {
        items: mapItems(props.items),
        direction: props.direction,
        offsetTop: props.offset,
        bounds: props.bound,
        ...(props.container
          ? { getContainer: () => document.querySelector(props.container) || window }
          : {}),
        ...attrs,
        onChange: (href) => emit('change', href),
        // antd click 参数是 (event, link:{href,title})，统一为 (href, event)
        onClick: (event, link) => emit('click', link && link.href, event),
      })
  },
})
