import { defineComponent, h } from 'vue'
import { ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'

export default defineComponent({
  name: 'UcDropdown',
  inheritAttrs: false,
  props: {
    items: { type: Array, default: () => [] },
    trigger: {
      type: String,
      default: 'hover',
      validator: (v) => ['hover', 'click'].includes(v),
    },
    disabled: Boolean,
  },
  emits: ['command'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElDropdown,
        {
          trigger: props.trigger,
          disabled: props.disabled,
          ...attrs,
          onCommand: (key) => emit('command', key),
        },
        {
          // 默认插槽为触发元素
          default: slots.default,
          // dropdown 具名插槽为菜单
          dropdown: () =>
            h(
              ElDropdownMenu,
              () =>
                props.items.map((item) =>
                  h(
                    ElDropdownItem,
                    { command: item.key, disabled: item.disabled, divided: item.divided },
                    () => item.label,
                  ),
                ),
            ),
        },
      )
  },
})
