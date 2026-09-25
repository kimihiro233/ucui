import { defineComponent, h } from 'vue'
import { TypographyText } from 'ant-design-vue'

// antd 无 info 类型，语义最接近的是 secondary（灰色次要文本）；
// default 不传 type；success/warning/danger 直映
const typeMap = {
  default: undefined,
  info: 'secondary',
  success: 'success',
  warning: 'warning',
  danger: 'danger',
}

export default defineComponent({
  name: 'UcText',
  inheritAttrs: false,
  props: {
    type: { type: String, default: 'default' },
    size: { type: String, default: 'default' },
    truncated: Boolean,
    lineClamp: { type: [String, Number], default: undefined },
    tag: { type: String, default: 'span' },
  },
  setup(props, { slots, attrs }) {
    return () => {
      // antd Text 强制 component=span，且无多行 ellipsis 能力（rows 被剥离），
      // lineClamp 用与 element 相同的原生 CSS 桥接
      const { class: klass, style: userStyle, ...rest } = attrs
      const lineClampStyle =
        props.lineClamp === undefined || props.lineClamp === null
          ? null
          : {
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              WebkitLineClamp: props.lineClamp,
            }
      return h(
        TypographyText,
        {
          type: typeMap[props.type],
          ellipsis: props.truncated ? true : undefined,
          class: klass,
          style: [lineClampStyle, userStyle],
          ...rest,
        },
        slots,
      )
    }
  },
})
