import { defineComponent, h } from 'vue'
import { Steps } from 'ant-design-vue'

export default defineComponent({
  name: 'UcSteps',
  inheritAttrs: false,
  props: {
    modelValue: { type: Number, default: 0 },
    direction: {
      type: String,
      default: 'horizontal',
      validator: (v) => ['horizontal', 'vertical'].includes(v),
    },
    items: { type: Array, default: () => [] },
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(
        Steps,
        {
          // antd 用 current
          current: props.modelValue,
          direction: props.direction,
          items: props.items,
          ...attrs,
          'onUpdate:current': (v) => emit('update:modelValue', v),
          onChange: (v) => emit('change', v),
        },
      )
  },
})
