import { defineComponent, h } from 'vue'
import { Rate } from 'ant-design-vue'

export default defineComponent({
  name: 'UcRate',
  inheritAttrs: false,
  props: {
    modelValue: { type: Number, default: 0 },
    max: { type: Number, default: 5 },
    disabled: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(Rate, {
        // antd 的 Rate 使用 v-model:value，星星总数叫 count
        value: props.modelValue,
        'onUpdate:value': (value) => emit('update:modelValue', value),
        count: props.max,
        disabled: props.disabled,
        ...attrs,
        onChange: (value) => emit('change', value),
      })
  },
})
