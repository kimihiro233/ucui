import { defineComponent, h } from 'vue'
import { PageHeader } from 'ant-design-vue'

// UcPageHeader 统一 API：title / content / @back
// 与 element 的差异：
// 1. content 映射到 subTitle（标题旁副标题）
// 2. icon 插槽映射到 backIcon
// 3. antd 仅在传入 onBack 时才渲染返回按钮（element 恒渲染），故恒传 onBack
export default defineComponent({
  name: 'UcPageHeader',
  inheritAttrs: false,
  props: {
    title: String,
    content: { type: String, default: '' },
    ghost: { type: Boolean, default: undefined },
  },
  emits: ['back'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        PageHeader,
        {
          title: props.title,
          subTitle: props.content,
          ghost: props.ghost,
          ...attrs,
          onBack: () => emit('back'),
        },
        {
          backIcon: slots.icon,
          title: slots.title,
          subTitle: slots.content,
          extra: slots.extra,
          breadcrumb: slots.breadcrumb,
          default: slots.default,
        },
      )
  },
})
