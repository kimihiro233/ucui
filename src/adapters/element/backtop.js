import { defineComponent, h } from 'vue'
import { ElBacktop } from 'element-plus'

// 回到顶部：visibilityHeight/target/right/bottom + @click + 默认插槽自定义内容
export default defineComponent({
  name: 'UcBacktop',
  inheritAttrs: false,
  props: {
    visibilityHeight: { type: Number, default: 200 },
    // 触发滚动的容器，CSS 选择器（空串=整窗）
    target: { type: String, default: '' },
    right: { type: Number, default: 40 },
    bottom: { type: Number, default: 40 },
  },
  emits: ['click'],
  setup(props, { emit, slots, attrs }) {
    // ElBacktop 根 vnode 是 Transition，不会把 class/style 透传给内部按钮，
    // 用一层包裹节点承接逃生舱 class/style（fixed 子元素相对视口定位，不受影响）
    const { class: klass, style: userStyle, ...rest } = attrs
    return () =>
      h(
        'div',
        { class: klass, style: userStyle },
        [
          h(
            ElBacktop,
            {
              visibilityHeight: props.visibilityHeight,
              target: props.target || undefined,
              right: props.right,
              bottom: props.bottom,
              ...rest,
              onClick: (event) => emit('click', event),
            },
            slots,
          ),
        ],
      )
  },
})
