import { defineComponent, h } from 'vue'
import { Timeline, TimelineItem } from 'ant-design-vue'

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
    return () =>
      h(
        Timeline,
        { mode: props.mode, reverse: props.reverse, ...attrs },
        () =>
          props.items.map((item) =>
            h(
              TimelineItem,
              { color: item.color },
              {
                // antd TimelineItem 没有独立 timestamp prop，时间拼到内容下方
                default: () => [
                  h('p', { class: 'uc-timeline-content' }, item.content),
                  item.timestamp
                    ? h('p', { class: 'uc-timeline-time' }, item.timestamp)
                    : null,
                ],
              },
            ),
          ),
      )
  },
})
