import { defineComponent, h } from 'vue'
import { ensureFloatButtonStyle } from './native-styles'

// UcFloatButton（element 原生兜底实现）
// element-plus 2.14.6 无 FloatButton（ant-design-vue 有），这里用原生 button/a 实现，
// API 与 antd 侧对齐：type('default'|'primary') / shape('circle'|'square') / tooltip /
// href / target + @click；icon 插槽为图标位，default 插槽为描述文本（仅 square 渲染）。
// 类名 uc- 前缀对齐 ant-float-btn 后缀，固定定位样式经 native-styles 注入
ensureFloatButtonStyle()

export default defineComponent({
  name: 'UcFloatButton',
  inheritAttrs: false,
  props: {
    type: { type: String, default: 'default', validator: (v) => ['default', 'primary'].includes(v) },
    shape: { type: String, default: 'circle', validator: (v) => ['circle', 'square'].includes(v) },
    tooltip: { type: [String, Object], default: undefined },
    href: { type: String, default: undefined },
    target: { type: String, default: undefined },
  },
  emits: ['click'],
  setup(props, { emit, slots, attrs }) {
    const onClick = (e) => emit('click', e)

    return () => {
      const { class: userClass, style: userStyle, ...restAttrs } = attrs
      const baseProps = {
        class: ['uc-float-btn', `uc-float-btn-${props.type}`, `uc-float-btn-${props.shape}`, userClass],
        style: userStyle,
        title: typeof props.tooltip === 'string' ? props.tooltip : undefined,
        href: props.href,
        target: props.target,
        onClick,
        ...restAttrs,
      }
      const content = [
        slots.icon ? h('span', { class: 'uc-float-btn-icon' }, slots.icon()) : null,
        props.shape === 'square' && slots.default
          ? h('span', { class: 'uc-float-btn-description' }, slots.default())
          : null,
      ]
      return h(
        props.href ? 'a' : 'button',
        props.href ? baseProps : { ...baseProps, type: 'button' },
        [h('div', { class: 'uc-float-btn-body' }, content)],
      )
    }
  },
})
