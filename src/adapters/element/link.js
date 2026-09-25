import { defineComponent, h } from 'vue'
import { ElLink } from 'element-plus'

// UcLink：文字链接
// 统一 API：type(default|primary|success|warning|danger)/href/target/disabled/
//           underline(always|hover|never，默认 hover) + @click(event) + 默认插槽
// element 2.14.6 的 underline 字符串模式（boolean 已废弃会告警），直映即可
export default defineComponent({
  name: 'UcLink',
  inheritAttrs: false,
  props: {
    type: {
      type: String,
      default: 'default',
      validator: (v) =>
        ['default', 'primary', 'success', 'warning', 'danger'].includes(v),
    },
    href: { type: String, default: '' },
    target: { type: String, default: '_self' },
    disabled: Boolean,
    underline: {
      type: String,
      default: 'hover',
      validator: (v) => ['always', 'hover', 'never'].includes(v),
    },
  },
  emits: ['click'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElLink,
        {
          type: props.type,
          underline: props.underline,
          disabled: props.disabled,
          href: props.href,
          target: props.target,
          ...attrs,
          // ElLink 在 disabled 时自身不 emit，归一化层行为保持一致
          onClick: (event) => emit('click', event),
        },
        { default: slots.default },
      )
  },
})
