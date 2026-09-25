import { defineComponent, h } from 'vue'
import { Dropdown } from 'ant-design-vue'

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
        Dropdown,
        {
          // antd trigger 接收数组
          trigger: [props.trigger],
          disabled: props.disabled,
          menu: {
            items: props.items,
            onClick: ({ key }) => emit('command', key),
          },
          ...attrs,
        },
        slots,
      )
  },
})
