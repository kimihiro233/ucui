import { defineComponent, h } from 'vue'
import { Descriptions } from 'ant-design-vue'
import { sizeMap, sizePropDef } from './shared'

const DescriptionsItem = Descriptions.Item

export default defineComponent({
  name: 'UcDescriptions',
  inheritAttrs: false,
  props: {
    title: String,
    bordered: Boolean,
    column: { type: Number, default: 3 },
    size: sizePropDef,
    // items: [{ label, value?, span?, render?(item) }]；render 优先于 value
    items: { type: Array, default: () => [] },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        Descriptions,
        {
          title: props.title,
          bordered: props.bordered,
          column: props.column,
          size: sizeMap[props.size],
          ...attrs,
        },
        {
          extra: slots.extra,
          // antd Descriptions 无 items prop，用 DescriptionsItem 子节点
          default: () =>
            props.items.map((item) =>
              h(
                DescriptionsItem,
                { label: item.label, span: item.span },
                { default: item.render ? () => item.render(item) : () => item.value },
              ),
            ),
        },
      )
  },
})
