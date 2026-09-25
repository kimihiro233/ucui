import { defineComponent, h } from 'vue'
import { ElCol } from 'element-plus'

// UcCol：栅格列（24 栅格）
// 统一 API：span(默认 24)/offset/pull/push + xs/sm/md/lg/xl(number|{span,offset,pull,push})
// element 无 xxl/order，统一层不收（antd 增强能力经 attrs 逃生舱可用）
const RESPONSIVE = ['xs', 'sm', 'md', 'lg', 'xl']

export default defineComponent({
  name: 'UcCol',
  inheritAttrs: false,
  props: {
    span: { type: Number, default: 24 },
    offset: { type: Number, default: 0 },
    pull: { type: Number, default: 0 },
    push: { type: Number, default: 0 },
    xs: { type: [Number, Object], default: undefined },
    sm: { type: [Number, Object], default: undefined },
    md: { type: [Number, Object], default: undefined },
    lg: { type: [Number, Object], default: undefined },
    xl: { type: [Number, Object], default: undefined },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ElCol,
        {
          span: props.span,
          offset: props.offset,
          pull: props.pull,
          push: props.push,
          ...Object.fromEntries(
            RESPONSIVE.filter((bp) => props[bp] !== undefined).map((bp) => [bp, props[bp]]),
          ),
          ...attrs,
        },
        { default: slots.default },
      )
  },
})
