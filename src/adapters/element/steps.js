import { defineComponent, h } from 'vue'
import { ElSteps, ElStep } from 'element-plus'

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
        ElSteps,
        {
          // element 用 active
          active: props.modelValue,
          direction: props.direction,
          ...attrs,
          onChange: (v) => {
            emit('update:modelValue', v)
            emit('change', v)
          },
        },
        () =>
          props.items.map((item) =>
            h(ElStep, { title: item.title, description: item.description }),
          ),
      )
  },
})
