import { defineComponent, h } from 'vue'
import { RadioGroup } from 'ant-design-vue'
import { sizeMap } from './shared'

export default defineComponent({
  name: 'UcRadioGroup',
  inheritAttrs: false,
  props: {
    modelValue: { type: [String, Number, Boolean], default: undefined },
    // 数据驱动：[{ label, value, disabled? }]
    options: { type: Array, default: () => [] },
    disabled: Boolean,
    size: { type: String, default: 'default', validator: (v) => ['large', 'default', 'small'].includes(v) },
    type: { type: String, default: 'radio', validator: (v) => ['radio', 'button'].includes(v) },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(RadioGroup, {
        // antd 的 RadioGroup 使用 v-model:value
        value: props.modelValue,
        'onUpdate:value': (value) => emit('update:modelValue', value),
        options: props.options,
        disabled: props.disabled,
        size: sizeMap[props.size],
        optionType: props.type === 'button' ? 'button' : 'default',
        ...attrs,
        // antd 的 change 参数是事件对象，归一化为值
        onChange: (event) => emit('change', event.target.value),
      })
  },
})
