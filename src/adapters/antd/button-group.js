import { defineComponent, h, cloneVNode } from 'vue'
import { Button } from 'ant-design-vue'

// UcButtonGroup：size(large|default|small) / type(primary|default|danger)
// antd AButtonGroup 无 type/direction 能力：size 走 GroupSizeContext
// （其优先级高于按钮自身 size，可穿透 UcButton 包装）；type 通过
// cloneVNode 注入直接 UcButton 子节点；direction 不透传。
const sizeMap = { large: 'large', default: 'middle', small: 'small' }

export default defineComponent({
  name: 'UcButtonGroup',
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: 'default',
      validator: (v) => ['large', 'default', 'small'].includes(v),
    },
    type: {
      type: String,
      default: 'default',
      validator: (v) => ['primary', 'default', 'danger'].includes(v),
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator: (v) => ['horizontal', 'vertical'].includes(v),
    },
  },
  setup(props, { slots, attrs }) {
    const augment = (vnodes) =>
      vnodes.map((vnode) => {
        if (vnode.type?.name !== 'UcButton') return vnode
        const override = {}
        if (props.size !== 'default') override.size = props.size
        if (props.type !== 'default') override.type = props.type
        return Object.keys(override).length ? cloneVNode(vnode, override) : vnode
      })

    return () =>
      h(
        Button.Group,
        {
          size: sizeMap[props.size],
          ...attrs,
        },
        () => augment(slots.default?.() ?? []),
      )
  },
})
