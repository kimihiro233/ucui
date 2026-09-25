import { defineComponent, h } from 'vue'
import { BackTop } from 'ant-design-vue'

// antd BackTop（FloatButton.BackTop）差异：
// - target 是 getContainer 函数，统一层字符串选择器在此转换（同 Affix 模式）
// - 无 right/bottom prop，桥接为固定定位 inline style
// - 默认插槽在 antd 是 description（仅 square 显示），图标内容对应 icon 插槽
export default defineComponent({
  name: 'UcBacktop',
  inheritAttrs: false,
  props: {
    visibilityHeight: { type: Number, default: 200 },
    target: { type: String, default: '' },
    right: { type: Number, default: 40 },
    bottom: { type: Number, default: 40 },
  },
  emits: ['click'],
  setup(props, { emit, slots, attrs }) {
    return () => {
      const { class: klass, style: userStyle, ...rest } = attrs
      return h(
        BackTop,
        {
          visibilityHeight: props.visibilityHeight,
          target: props.target
            ? () => document.querySelector(props.target) || window
            : () => window,
          class: klass,
          style: [
            { right: `${props.right}px`, bottom: `${props.bottom}px` },
            userStyle,
          ],
          ...rest,
          onClick: (event) => emit('click', event),
        },
        slots.default ? { icon: () => slots.default() } : undefined,
      )
    }
  },
})
