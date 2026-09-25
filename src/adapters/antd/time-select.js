import { defineComponent, h } from 'vue'
import { Select } from 'ant-design-vue'
import { sizeMap, sizePropDef } from './shared'

// UcTimeSelect（antd 桥接实现）
// ant-design-vue 4.2.6 无 TimeSelect，用 ASelect 桥接：
// 按 start/end/step 生成 'HH:mm' 选项，minTime/maxTime 的置灰语义对齐 element
// （value <= minTime 或 value >= maxTime 的项 disabled，含边界本身）
const toMinutes = (time) => {
  const [hours, minutes] = String(time).split(':').map(Number)
  return (hours || 0) * 60 + (minutes || 0)
}
const toTime = (minutes) =>
  `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`

export function buildTimeOptions(start, end, step, minTime, maxTime) {
  const startM = toMinutes(start)
  const endM = toMinutes(end)
  const stepM = Math.max(toMinutes(step) || 30, 1)
  const minM = minTime ? toMinutes(minTime) : null
  const maxM = maxTime ? toMinutes(maxTime) : null
  const options = []
  for (let current = startM; current <= endM; current += stepM) {
    const value = toTime(current)
    options.push({
      label: value,
      value,
      disabled: (minM != null && current <= minM) || (maxM != null && current >= maxM),
    })
  }
  return options
}

export default defineComponent({
  name: 'UcTimeSelect',
  inheritAttrs: false,
  props: {
    // 默认 undefined：antd Select 把 '' 视为已有值会吞掉 placeholder
    modelValue: { type: String, default: undefined },
    start: { type: String, default: '09:00' },
    end: { type: String, default: '18:00' },
    step: { type: String, default: '00:30' },
    minTime: { type: String, default: undefined },
    maxTime: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    disabled: Boolean,
    clearable: { type: Boolean, default: true },
    editable: { type: Boolean, default: true },
    size: sizePropDef,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(Select, {
        value: props.modelValue,
        'onUpdate:value': (value) => emit('update:modelValue', value),
        options: buildTimeOptions(props.start, props.end, props.step, props.minTime, props.maxTime),
        placeholder: props.placeholder,
        allowClear: props.clearable,
        disabled: props.disabled,
        showSearch: props.editable,
        optionFilterProp: 'label',
        size: sizeMap[props.size],
        ...attrs,
        onChange: (value) => emit('change', value),
      })
  },
})
