import { defineComponent, h, cloneVNode } from 'vue'
import { ElButtonGroup } from 'element-plus'

// UcButtonGroup：size(large|default|small) / type(primary|default|danger)
// direction(horizontal|vertical，element 单边能力)
// 注意：UcButton 始终向 ElButton 显式传 size='default'，而 element 的 group
// 上下文 useFormSize 优先级低于 props.size，provide 会被遮挡；因此这里用
// cloneVNode 把 group 的 size/type 直接注入到直接 UcButton 子节点。
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
        ElButtonGroup,
        {
          size: props.size,
          type: props.type === 'default' ? undefined : props.type,
          direction: props.direction,
          ...attrs,
        },
        () => augment(slots.default?.() ?? []),
      )
  },
})
