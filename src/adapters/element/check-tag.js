import { defineComponent, h } from 'vue'
import { ElCheckTag } from 'element-plus'

// 可勾选标签：v-model:checked + disabled + type(仅 element 有配色)
export default defineComponent({
  name: 'UcCheckTag',
  inheritAttrs: false,
  props: {
    checked: Boolean,
    disabled: Boolean,
    // primary|success|info|warning|danger，仅 element 生效
    type: { type: String, default: 'primary' },
  },
  emits: ['update:checked', 'change'],
  setup(props, { emit, slots, attrs }) {
    // 只挂 onChange：element 同时会 emit update:checked，
    // 这里统一从 change 归一化出两个事件，避免重复触发
    const onChange = (value) => {
      if (props.disabled) return
      emit('update:checked', value)
      emit('change', value)
    }
    return () =>
      h(
        ElCheckTag,
        {
          checked: props.checked,
          disabled: props.disabled,
          type: props.type,
          ...attrs,
          onChange,
        },
        slots,
      )
  },
})
