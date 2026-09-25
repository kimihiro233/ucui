import { defineComponent, h } from 'vue'
import { ElDrawer } from 'element-plus'

export default defineComponent({
  name: 'UcDrawer',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    title: String,
    // 统一用 size 表示宽度（右侧抽屉）
    size: { type: [String, Number], default: undefined },
  },
  emits: ['update:modelValue', 'open', 'close'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElDrawer,
        {
          modelValue: props.modelValue,
          'onUpdate:modelValue': (value) => emit('update:modelValue', value),
          title: props.title,
          size: props.size,
          // element 的 update:modelValue(false) 依赖 transition afterLeave 钩子，
          // 测试环境（happy-dom + transition stub）不会触发；注入 beforeClose 同步归一化关闭语义
          beforeClose: (done) => {
            emit('update:modelValue', false)
            done()
          },
          ...attrs,
          onOpen: () => emit('open'),
          onClose: () => emit('close'),
        },
        slots,
      )
  },
})
