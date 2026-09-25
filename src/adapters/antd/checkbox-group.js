import { defineComponent, h } from 'vue'
import { CheckboxGroup } from 'ant-design-vue'

export default defineComponent({
  name: 'UcCheckboxGroup',
  inheritAttrs: false,
  props: {
    modelValue: { type: Array, default: () => [] },
    // 数据驱动：[{ label, value, disabled? }]
    options: { type: Array, default: () => [] },
    disabled: Boolean,
    // antd-vue 4.x CheckboxGroup 不支持 min/max/size/按钮形态，显式声明后丢弃
    min: { type: Number, default: undefined },
    max: { type: Number, default: undefined },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(CheckboxGroup, {
        // antd 的 CheckboxGroup 使用 v-model:value
        value: props.modelValue,
        'onUpdate:value': (value) => emit('update:modelValue', value),
        options: props.options,
        disabled: props.disabled,
        ...attrs,
        // antd CheckboxGroup 的 change 参数直接是值数组
        onChange: (value) => emit('change', value),
      })
  },
})
