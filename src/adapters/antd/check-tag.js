import { defineComponent, h } from 'vue'
import { CheckableTag } from 'ant-design-vue'

// antd CheckableTag 无 disabled/type 能力：
// disabled 由适配器拦截 change 并加禁用视觉样式；type 仅 element 生效
export default defineComponent({
  name: 'UcCheckTag',
  inheritAttrs: false,
  props: {
    checked: Boolean,
    disabled: Boolean,
    type: { type: String, default: 'primary' },
  },
  emits: ['update:checked', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () => {
      const { class: klass, style: userStyle } = attrs
      return h(
        CheckableTag,
        {
          checked: props.checked,
          class: klass,
          style: [
            props.disabled ? { cursor: 'not-allowed', opacity: 0.5 } : null,
            userStyle,
          ],
          onChange: (value) => {
            if (props.disabled) return
            emit('update:checked', value)
            emit('change', value)
          },
        },
        slots,
      )
    }
  },
})
