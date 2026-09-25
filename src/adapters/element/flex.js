import { defineComponent, h, computed } from 'vue'

// element-plus 无 Flex 组件（antd 有），原生兜底：props 全部换算成内联 flex 样式
// 类名 uc- 前缀、后缀对齐 antd（uc-flex-vertical 等）；gap 档位对齐 antd（8/16/24）
const GAP_PRESET = { small: 8, middle: 16, large: 24 }

export default defineComponent({
  name: 'UcFlex',
  inheritAttrs: false,
  props: {
    vertical: Boolean,
    wrap: String,
    justify: String,
    align: String,
    gap: { type: [Number, String], default: undefined },
    flex: { type: [Number, String], default: undefined },
    tag: { type: String, default: 'div' },
  },
  setup(props, { attrs, slots }) {
    const style = computed(() => ({
      display: 'flex',
      'flex-direction': props.vertical ? 'column' : 'row',
      'flex-wrap': props.wrap || undefined,
      'justify-content': props.justify || undefined,
      'align-items': props.align || undefined,
      gap:
        typeof props.gap === 'number'
          ? `${props.gap}px`
          : GAP_PRESET[props.gap] != null
            ? `${GAP_PRESET[props.gap]}px`
            : undefined,
      flex: props.flex != null ? String(props.flex) : undefined,
    }))
    return () => {
      // 兜底组件 class/style 合并（踩坑第 61 条）：attrs 同名 key 会整体覆盖基础值，先解构再合
      const { class: ec, style: es, ...rest } = attrs
      return h(
        props.tag,
        {
          class: ['uc-flex', props.vertical && 'uc-flex-vertical', ec],
          style: [style.value, es],
          ...rest,
        },
        slots.default?.(),
      )
    }
  },
})
