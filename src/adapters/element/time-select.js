import { defineComponent, h } from 'vue'
import { ElTimeSelect } from 'element-plus'
import { sizePropDef } from './shared'

// 统一 API：v-model('HH:mm' 字符串) / start / end / step / minTime / maxTime /
// placeholder / disabled / clearable / editable / size + @change
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
      h(ElTimeSelect, {
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => emit('update:modelValue', value),
        start: props.start,
        end: props.end,
        step: props.step,
        minTime: props.minTime,
        maxTime: props.maxTime,
        placeholder: props.placeholder,
        disabled: props.disabled,
        clearable: props.clearable,
        editable: props.editable,
        size: props.size,
        ...attrs,
        onChange: (value) => emit('change', value),
      })
  },
})
