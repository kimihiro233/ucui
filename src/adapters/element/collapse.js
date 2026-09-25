import { defineComponent, h } from 'vue'
import { ElCollapse, ElCollapseItem } from 'element-plus'

export default defineComponent({
  name: 'UcCollapse',
  inheritAttrs: false,
  props: {
    // 非手风琴为数组，手风琴为字符串
    modelValue: { type: [Array, String], default: () => [] },
    accordion: Boolean,
    items: { type: Array, default: () => [] },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElCollapse,
        {
          modelValue: props.modelValue,
          accordion: props.accordion,
          ...attrs,
          'onUpdate:modelValue': (v) => emit('update:modelValue', v),
        },
        () =>
          props.items.map((item) =>
            h(
              ElCollapseItem,
              { name: item.key, title: item.title, disabled: item.disabled },
              // 面板内容走具名插槽（插槽名 = key），与 Tabs 惯例一致
              { default: slots[item.key] },
            ),
          ),
      )
  },
})
