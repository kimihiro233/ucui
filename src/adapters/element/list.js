import { defineComponent, h } from 'vue'
import { sizePropDef } from './shared'
import { ensureListStyle } from './native-styles'

// element-plus 无 List 组件（antd 有），原生兜底：
// 类名 uc- 前缀、后缀对齐 antd（.uc-list-item-meta-title / .uc-list-item-action 等）
// 骨架样式经 native-styles.js 的 ensureListStyle() 注入
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
    ensureListStyle()
    const renderItem = (item, index) =>
      h('li', { key: item?.key ?? index, class: 'uc-list-item' }, [
        h('div', { class: 'uc-list-item-meta' }, [
          item.avatar &&
            h('div', { class: 'uc-list-item-meta-avatar' }, [h('img', { src: item.avatar, alt: '' })]),
          h('div', { class: 'uc-list-item-meta-content' }, [
            item.title != null && h('h4', { class: 'uc-list-item-meta-title' }, item.title),
            item.description != null && h('div', { class: 'uc-list-item-meta-description' }, item.description),
          ]),
        ]),
        item.content != null && h('div', { class: 'uc-list-item-content' }, item.content),
        item.actions?.length
          ? h(
              'ul',
              { class: 'uc-list-item-action' },
              item.actions.map((action, i) =>
                h('li', { key: i }, [
                  action,
                  i !== item.actions.length - 1 && h('em', { class: 'uc-list-item-action-split' }),
                ]),
              ),
            )
          : null,
        item.extra != null && h('div', { class: 'uc-list-item-extra' }, item.extra),
      ])
    return () => {
      const { class: ec, style: es, ...rest } = attrs
      return h(
        'div',
        {
          class: [
            'uc-list',
            props.bordered && 'uc-list-bordered',
            props.split && 'uc-list-split',
            props.loading && 'uc-list-loading',
            props.itemLayout === 'vertical' && 'uc-list-vertical',
            props.size === 'large' && 'uc-list-lg',
            props.size === 'small' && 'uc-list-sm',
            ec,
          ],
          style: es,
          ...rest,
        },
        [
          props.header != null && h('div', { class: 'uc-list-header' }, props.header),
          props.loading
            ? h('div', { class: 'uc-list-spinning', style: { minHeight: '53px' } }, '加载中…')
            : props.items.length
              ? h('ul', { class: 'uc-list-items' }, props.items.map(renderItem))
              : h('div', { class: 'uc-list-empty-text' }, '暂无数据'),
          props.footer != null && h('div', { class: 'uc-list-footer' }, props.footer),
        ],
      )
    }
  },
})
