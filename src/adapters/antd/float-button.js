import { defineComponent, h } from 'vue'
import { FloatButton } from 'ant-design-vue'

// 统一 API：type('default'|'primary') / shape('circle'|'square') / tooltip / href / target + @click
// icon 插槽为图标位；default 插槽为描述文本，仅 square 形态渲染（与 antd 语义一致，
// circle 传 description 会触发 antd dev 告警）
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
    return () => {
      const description = props.shape === 'square' ? slots.default?.() : undefined
      return h(
        FloatButton,
        {
          type: props.type,
          shape: props.shape,
          tooltip: props.tooltip,
          href: props.href,
          target: props.target,
          description,
          ...attrs,
          // 事件归一化放 attrs 之后，防止被覆盖
          onClick: (e) => emit('click', e),
        },
        { icon: slots.icon, tooltip: slots.tooltip },
      )
    }
  },
})
