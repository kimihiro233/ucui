import { defineComponent, h, cloneVNode } from 'vue'
import { Avatar } from 'ant-design-vue'

// UcAvatarGroup：size(档位或 px) / shape(circle|square) / max(折叠阈值)
// placement（"+N" 气泡位置，默认 top）
// antd 对应 maxCount / maxPopoverPlacement；"+N" 触发器是 Popover 包裹的
// AAvatar。size/shape 同时经上下文（size 以 'default' 为哨兵、shape 上下文
// 优先）与 cloneVNode 双通道保证穿透 UcAvatar 包装。
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
        Avatar.Group,
        {
          size: props.size ?? 'default',
          shape: props.shape ?? 'circle',
          ...(props.max != null ? { maxCount: props.max } : {}),
          maxPopoverPlacement: props.placement,
          ...attrs,
        },
        () => augment(slots.default?.() ?? []),
      )
  },
})
