import { defineComponent, h } from 'vue'
import { ElPageHeader } from 'element-plus'

// UcPageHeader 统一 API：title / content / @back
// 插槽：icon(返回箭头) / title / content / extra / breadcrumb / default(主体)
// ghost 为 antd 单边能力（element 页头本就无底色），声明但本侧不透传
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
        ElPageHeader,
        {
          title: props.title,
          content: props.content,
          ...attrs,
          onBack: () => emit('back'),
        },
        {
          icon: slots.icon,
          title: slots.title,
          content: slots.content,
          extra: slots.extra,
          breadcrumb: slots.breadcrumb,
          default: slots.default,
        },
      )
  },
})
