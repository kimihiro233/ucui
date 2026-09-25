import { defineComponent, h } from 'vue'
import { Collapse, CollapsePanel } from 'ant-design-vue'

export default defineComponent({
  name: 'UcCollapse',
  inheritAttrs: false,
  props: {
    modelValue: { type: [Array, String], default: () => [] },
    accordion: Boolean,
    items: { type: Array, default: () => [] },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        Collapse,
        {
          // antd 用 activeKey
          activeKey: props.modelValue,
          accordion: props.accordion,
          ...attrs,
          'onUpdate:activeKey': (v) => emit('update:modelValue', v),
        },
        () =>
          props.items.map((item) =>
            h(
              CollapsePanel,
              {
                key: item.key,
                header: item.title,
                disabled: item.disabled,
                // 未激活面板也渲染内容（v-show 隐藏），与 element 行为对齐
                forceRender: true,
              },
              { default: slots[item.key] },
            ),
          ),
      )
  },
})
