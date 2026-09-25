import { defineComponent, h } from 'vue'
import { Statistic } from 'ant-design-vue'

// UcCountdown：倒计时
// 统一 API：value(目标时间戳 ms)/format(默认 HH:mm:ss)/title/prefix/suffix/valueStyle
//           + @finish() @change(remainMs)
// antd 用 Statistic.Countdown（内部名 AStatisticCountdown），setInterval 33ms 刷新；
// onFinish/onChange 是函数 props（组件未声明 emits），onChange 回传的也是剩余毫秒
const ACountdown = Statistic.Countdown

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
        ACountdown,
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
