import { defineComponent, h } from 'vue'
import { ElCard } from 'element-plus'

export default defineComponent({
  name: 'UcCard',
  inheritAttrs: false,
  props: {
    title: String,
    // element Card 无 bordered 开关（始终有边框），该 prop 在 element 侧忽略
    bordered: { type: Boolean, default: true },
    hoverable: Boolean,
  },
  setup(props, { slots, attrs }) {
    return () => {
      const cardSlots = { ...slots }
      // element 的头部只有一个 header 插槽；有 extra 时把 title 与 extra 组合进 header
      if (slots.extra) {
        cardSlots.header = () =>
          h('div', { style: 'display:flex;justify-content:space-between;align-items:center' }, [
            h('span', props.title),
            h('span', slots.extra()),
          ])
      }
      return h(
        ElCard,
        {
          // title prop 直接走 element 的 header prop；有自定义 header 插槽时不传
          header: slots.extra ? undefined : props.title,
          // hoverable 映射为 shadow=hover，否则常驻阴影
          shadow: props.hoverable ? 'hover' : 'always',
          ...attrs,
        },
        cardSlots,
      )
    }
  },
})
