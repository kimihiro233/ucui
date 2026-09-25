import { defineComponent, h } from 'vue'
import { ElText } from 'element-plus'

// 统一排版文本：type 取双端交集（element 的 primary 即默认色，不纳入）
// size/tag 为 element 单边能力（antd Typography.Text 无对应 prop，不映射）
export default defineComponent({
  name: 'UcText',
  inheritAttrs: false,
  props: {
    // default|success|info|warning|danger
    type: { type: String, default: 'default' },
    // large|default|small，仅 element 生效
    size: { type: String, default: 'default' },
    // 单行省略
    truncated: Boolean,
    // 最大行数
    lineClamp: { type: [String, Number], default: undefined },
    // 自定义元素标签，仅 element 生效
    tag: { type: String, default: 'span' },
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ElText,
        {
          type: props.type === 'default' ? '' : props.type,
          size: props.size === 'default' ? undefined : props.size,
          truncated: props.truncated,
          lineClamp: props.lineClamp,
          tag: props.tag,
          ...attrs,
        },
        slots,
      )
  },
})
