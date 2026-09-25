import { defineComponent, h } from 'vue'
import { Drawer } from 'ant-design-vue'

export default defineComponent({
  name: 'UcDrawer',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    title: String,
    size: { type: [String, Number], default: undefined },
  },
  emits: ['update:modelValue', 'open', 'close'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        Drawer,
        {
          // antd 的 Modal/Drawer 使用 v-model:open，归一化为标准 modelValue
          open: props.modelValue,
          'onUpdate:open': (value) => emit('update:modelValue', value),
          title: props.title,
          // antd 用 width 表示右侧抽屉宽度，对应统一层的 size
          width: props.size,
          ...attrs,
          onAfterOpenChange: (open) => emit(open ? 'open' : 'close'),
        },
        slots,
      )
  },
})
