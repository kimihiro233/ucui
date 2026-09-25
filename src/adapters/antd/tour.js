import { defineComponent, h } from 'vue'
import { Tour } from 'ant-design-vue'

// UcTour 统一层：
// v-model=是否打开（antd 内部是 open）；v-model:current=当前步骤
// steps=[{target?,title,description?,placement?}]（antd 原生 steps 数组模式）
// 事件：@close(current) / @finish / @change(current)
// 差异：antd 用 arrow 对应 showArrow；无 showClose（关闭按钮恒显）；
// vc-tour 受控 open 不会自行关闭，onClose 时适配器归一化 emit update:modelValue(false)
export default defineComponent({
  name: 'UcTour',
  inheritAttrs: false,
  props: {
    modelValue: { type: Boolean, default: false },
    current: { type: Number, default: 0 },
    steps: {
      type: Array,
      default: () => [],
    },
    mask: { type: Boolean, default: true },
    showArrow: { type: Boolean, default: true },
    // antd 无关闭按钮开关，声明仅为 API 对齐（恒显）
    showClose: { type: Boolean, default: true },
    // default | primary
    type: { type: String, default: 'default' },
  },
  emits: ['update:modelValue', 'update:current', 'close', 'finish', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(Tour, {
        open: props.modelValue,
        current: props.current,
        mask: props.mask,
        arrow: props.showArrow,
        type: props.type,
        steps: props.steps.map((step) => ({
          target: step.target,
          title: step.title,
          description: step.description,
          placement: step.placement,
        })),
        ...attrs,
        'onUpdate:open': (value) => emit('update:modelValue', value),
        'onUpdate:current': (value) => emit('update:current', value),
        onChange: (current) => emit('change', current),
        onClose: (current) => {
          emit('update:modelValue', false)
          emit('close', current)
        },
        // vc-tour 完成时先触发 onClose 再触发 onFinish，与 element 顺序一致
        onFinish: () => emit('finish'),
      })
  },
})
