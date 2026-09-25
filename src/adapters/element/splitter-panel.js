import { defineComponent, h } from 'vue'
import { ElSplitterPanel } from 'element-plus'

// UcSplitterPanel：分割面板
// 统一 API：size/min/max(number px | '120px' | '30%') / resizable(默认 true) /
//   collapsible(boolean | {start?:boolean,end?:boolean})
// 事件：@update:size(px)
// 插槽：default 内容；#start-collapsible / #end-collapsible 自定义折叠触发器
export default defineComponent({
  name: 'UcSplitterPanel',
  inheritAttrs: false,
  props: {
    size: { type: [String, Number], default: undefined },
    min: { type: [String, Number], default: undefined },
    max: { type: [String, Number], default: undefined },
    resizable: { type: Boolean, default: true },
    collapsible: { type: [Boolean, Object], default: false },
  },
  emits: ['update:size'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(
        ElSplitterPanel,
        {
          size: props.size,
          min: props.min,
          max: props.max,
          resizable: props.resizable,
          collapsible: props.collapsible,
          ...attrs,
          'onUpdate:size': (value) => emit('update:size', value),
        },
        {
          default: slots.default,
          'start-collapsible': slots['start-collapsible'],
          'end-collapsible': slots['end-collapsible'],
        },
      )
  },
})
