import { defineComponent, h, cloneVNode } from 'vue'
import { ElAvatarGroup } from 'element-plus'

// UcAvatarGroup：size(档位或 px) / shape(circle|square) / max(折叠阈值)
// placement（"+N" 气泡位置，默认 top）
// element 折叠需显式 collapseAvatars + maxCollapseAvatars，传 max 时自动开启。
// UcAvatar 会向 ElAvatar 显式传 size='default'/shape='circle'，挡住
// props.size ?? groupContext 的空值合并，故用 cloneVNode 直接注入非默认值。
export default defineComponent({
  name: 'UcAvatarGroup',
  inheritAttrs: false,
  props: {
    size: { type: [Number, String], default: undefined },
    shape: {
      type: String,
      default: undefined,
      validator: (v) => v == null || ['circle', 'square'].includes(v),
    },
    max: Number,
    placement: { type: String, default: 'top' },
  },
  setup(props, { slots, attrs }) {
    const augment = (vnodes) =>
      vnodes.map((vnode) => {
        if (vnode.type?.name !== 'UcAvatar') return vnode
        const override = {}
        if (props.size != null) override.size = props.size
        if (props.shape != null) override.shape = props.shape
        return Object.keys(override).length ? cloneVNode(vnode, override) : vnode
      })

    return () =>
      h(
        ElAvatarGroup,
        {
          size: props.size,
          shape: props.shape,
          ...(props.max != null
            ? { collapseAvatars: true, maxCollapseAvatars: props.max }
            : {}),
          placement: props.placement,
          ...attrs,
        },
        () => augment(slots.default?.() ?? []),
      )
  },
})
