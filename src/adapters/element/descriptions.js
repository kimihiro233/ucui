import { defineComponent, h } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import { sizeMap, sizePropDef } from './shared'

export default defineComponent({
  name: 'UcDescriptions',
  inheritAttrs: false,
  props: {
    title: String,
    // 统一 bordered；element 侧对应 border
    bordered: Boolean,
    column: { type: Number, default: 3 },
    size: sizePropDef,
    // items: [{ label, value?, span?, render?(item) }]；render 优先于 value
    items: { type: Array, default: () => [] },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ElDescriptions,
        {
          title: props.title,
          border: props.bordered,
          column: props.column,
          size: sizeMap[props.size],
          ...attrs,
        },
        {
          extra: slots.extra,
          default: () =>
            props.items.map((item) =>
              h(
                ElDescriptionsItem,
                { label: item.label, span: item.span },
                { default: item.render ? () => item.render(item) : () => item.value },
              ),
            ),
        },
      )
  },
})
