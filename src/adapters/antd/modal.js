import { defineComponent, h } from 'vue'
import { Modal } from 'ant-design-vue'

export default defineComponent({
  name: 'UcModal',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    title: String,
    width: { type: [String, Number], default: undefined },
  },
  emits: ['update:modelValue', 'open', 'close'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        Modal,
        {
          // antd 的 Modal 使用 v-model:open，归一化为标准 modelValue
          open: props.modelValue,
          'onUpdate:open': (value) => emit('update:modelValue', value),
          title: props.title,
          width: props.width,
          ...attrs,
          onAfterOpenChange: (open) => emit(open ? 'open' : 'close'),
        },
        slots,
      )
  },
})
