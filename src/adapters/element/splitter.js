import { defineComponent, h } from 'vue'
import { ElSplitter } from 'element-plus'

// UcSplitter：分割面板容器
// 统一 API：layout(horizontal|vertical，默认 horizontal) / lazy(拖拽结束才更新尺寸)
//   默认插槽放 UcSplitterPanel
// 事件：@resize-start(index, sizes) / @resize(index, sizes) / @resize-end(index, sizes) /
//       @collapse(index, type: 'start'|'end', sizes)
// 注意：ElSplitter 靠 flattedChildren(subTree) 递归收集 ElSplitterPanel，
// 可穿透 UcSplitterPanel 包装层（vnode.util 递归 component.subTree），无需额外处理
export default defineComponent({
  name: 'UcSplitter',
  inheritAttrs: false,
  props: {
    layout: {
      type: String,
      default: 'horizontal',
      validator: (v) => ['horizontal', 'vertical'].includes(v),
    },
    lazy: Boolean,
  },
  emits: ['resize-start', 'resize', 'resize-end', 'collapse'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElSplitter,
        {
          layout: props.layout,
          lazy: props.lazy,
          ...attrs,
          // 归一化事件放 attrs 之后
          onResizeStart: (index, sizes) => emit('resize-start', index, sizes),
          onResize: (index, sizes) => emit('resize', index, sizes),
          onResizeEnd: (index, sizes) => emit('resize-end', index, sizes),
          onCollapse: (index, type, sizes) => emit('collapse', index, type, sizes),
        },
        slots,
      )
  },
})
