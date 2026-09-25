import { defineComponent, h } from 'vue'
import { ElDialog } from 'element-plus'

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
        ElDialog,
        {
          modelValue: props.modelValue,
          'onUpdate:modelValue': (value) => emit('update:modelValue', value),
          title: props.title,
          width: props.width,
          ...attrs,
          onOpen: () => emit('open'),
          onClose: () => emit('close'),
        },
        slots,
      )
  },
})
