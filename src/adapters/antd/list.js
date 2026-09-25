import { defineComponent, h } from 'vue'
import { List, ListItem, ListItemMeta } from 'ant-design-vue'
import { sizePropDef } from './shared'

// antd 原生 List（AList）：统一 items=[{key?, title, description?, avatar?, content?, extra?, actions?}]
// 通过 renderItem 数据驱动映射为 ListItem（actions/extra props）+ ListItemMeta（title/description/avatar）
// element 侧无 List，原生兜底见 element/list.js
export default defineComponent({
  name: 'UcList',
  inheritAttrs: false,
  props: {
    items: { type: Array, default: () => [] },
    header: String,
    footer: String,
    bordered: Boolean,
    split: { type: Boolean, default: true },
    loading: Boolean,
    size: sizePropDef,
    itemLayout: {
      type: String,
      default: 'horizontal',
      validator: (v) => ['horizontal', 'vertical'].includes(v),
    },
  },
  setup(props, { attrs }) {
    return () =>
      h(List, {
        dataSource: props.items,
        renderItem: ({ item, index }) =>
          h(
            ListItem,
            {
              key: item?.key ?? index,
              actions: item.actions?.length ? item.actions : undefined,
              // extra 是 vnode prop（克隆渲染），字符串包一层 span（uc- 类名兜底侧同名，契约可用统一选择器）
              extra: item.extra != null ? h('span', { class: 'uc-list-item-extra' }, item.extra) : undefined,
            },
            {
              default: () => [
                h(ListItemMeta, {
                  title: item.title,
                  description: item.description,
                  avatar: item.avatar ? h('img', { src: item.avatar, alt: '' }) : undefined,
                }),
                item.content != null && h('div', { class: 'uc-list-item-content' }, item.content),
              ],
            },
          ),
        bordered: props.bordered || undefined,
        split: props.split,
        loading: props.loading || undefined,
        size: props.size,
        itemLayout: props.itemLayout === 'vertical' ? 'vertical' : undefined,
        header: props.header || undefined,
        footer: props.footer || undefined,
        ...attrs,
      })
  },
})
