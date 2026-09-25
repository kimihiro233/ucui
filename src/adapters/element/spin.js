import { defineComponent, h, withDirectives } from 'vue'
import { vLoading } from 'element-plus'

// element-plus 没有 Spin 组件，用 v-loading 指令在包裹容器上模拟
export default defineComponent({
  name: 'UcSpin',
  inheritAttrs: false,
  props: {
    spinning: { type: Boolean, default: false },
    size: {
      type: String,
      default: 'default',
      validator: (v) => ['large', 'default', 'small'].includes(v),
    },
    tip: String,
  },
  setup(props, { slots, attrs }) {
    return () => {
      // v-loading 绑定：有 tip 时传配置对象 { text }，无 tip 时传布尔
      const binding = props.spinning && props.tip ? { text: props.tip } : props.spinning
      return withDirectives(
        h('div', { class: ['uc-spin', attrs.class], ...attrs }, slots.default ? slots.default() : undefined),
        [[vLoading, binding]],
      )
    }
  },
})
