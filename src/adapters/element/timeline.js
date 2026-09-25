import { defineComponent, h } from 'vue'
import { ElTimeline, ElTimelineItem } from 'element-plus'

export default defineComponent({
  name: 'UcTimeline',
  inheritAttrs: false,
  props: {
    items: { type: Array, default: () => [] },
    mode: {
      type: String,
      default: '',
      validator: (v) => ['', 'left', 'right', 'alternate'].includes(v),
    },
    reverse: Boolean,
  },
  setup(props, { attrs }) {
    // element mode 枚举为 start/end/alternate/alternate-reverse，
    // 与统一层（antd 语义）left/right/alternate/'' 做映射
    const elementModeMap = {
      '': 'start',
      left: 'start',
      right: 'end',
      alternate: 'alternate',
    }
    return () =>
      h(
        ElTimeline,
        { mode: elementModeMap[props.mode], reverse: props.reverse, ...attrs },
        () =>
          props.items.map((item) =>
            h(
              ElTimelineItem,
              {
                timestamp: item.timestamp,
                color: item.color,
                // 时间戳默认显示在底部
                placement: item.timestampPlacement || 'bottom',
              },
              { default: () => item.content },
            ),
          ),
      )
  },
})
