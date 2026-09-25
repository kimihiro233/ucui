import { defineComponent, h } from 'vue'
import { ElCountdown } from 'element-plus'

// UcCountdown：倒计时
// 统一 API：value(目标时间戳 ms)/format(默认 HH:mm:ss)/title/prefix/suffix/valueStyle
//           + @finish() @change(remainMs)
// element ElCountdown 同名直映（内部基于 ElStatistic + rAF）
export default defineComponent({
  name: 'UcCountdown',
  inheritAttrs: false,
  props: {
    value: { type: Number, default: 0 },
    format: { type: String, default: 'HH:mm:ss' },
    title: { type: String, default: '' },
    prefix: { type: String, default: '' },
    suffix: { type: String, default: '' },
    valueStyle: { type: [String, Object, Array], default: undefined },
  },
  emits: ['finish', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElCountdown,
        {
          value: props.value,
          format: props.format,
          ...(props.title ? { title: props.title } : {}),
          ...(props.prefix ? { prefix: props.prefix } : {}),
          ...(props.suffix ? { suffix: props.suffix } : {}),
          ...(props.valueStyle !== undefined ? { valueStyle: props.valueStyle } : {}),
          ...attrs,
          onFinish: () => emit('finish'),
          onChange: (remainMs) => emit('change', remainMs),
        },
        slots,
      )
  },
})
