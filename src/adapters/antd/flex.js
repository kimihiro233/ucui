import { defineComponent, h } from 'vue'
import { Flex } from 'ant-design-vue'

// antd 原生 Flex（AFlex）：统一层直映；element 侧无 Flex，原生兜底见 element/flex.js
// gap：number=px；'small'|'middle'|'large' 档位（antd 档位类 ant-flex-gap-*，element 内联 8/16/24px）
export default defineComponent({
  name: 'UcFlex',
  inheritAttrs: false,
  props: {
    vertical: Boolean,
    wrap: String, // 'wrap' | 'nowrap' | 'wrap-reverse'
    justify: String, // 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch' | 'normal'
    align: String, // 'start' | 'end' | 'center' | 'baseline' | 'stretch' | 'normal'
    gap: { type: [Number, String], default: undefined },
    flex: { type: [Number, String], default: undefined },
    tag: { type: String, default: 'div' }, // antd 的 component prop
  },
  setup(props, { attrs, slots }) {
    return () =>
      h(
        Flex,
        {
          vertical: props.vertical || undefined,
          wrap: props.wrap || undefined,
          justify: props.justify || undefined,
          align: props.align || undefined,
          gap: props.gap,
          flex: props.flex,
          component: props.tag,
          ...attrs,
        },
        slots,
      )
  },
})
