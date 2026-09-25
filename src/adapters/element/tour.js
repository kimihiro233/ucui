import { defineComponent, h } from 'vue'
import { ElTour, ElTourStep } from 'element-plus'

// UcTour 统一层：
// v-model=是否打开；v-model:current=当前步骤；steps=[{target?,title,description?,placement?}]
// 事件：@close(current) / @finish / @change(current)
// element 用 ElTour + ElTourStep 子组件模式，open 对应 modelValue
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
    showClose: { type: Boolean, default: true },
    // default | primary
    type: { type: String, default: 'default' },
  },
  emits: ['update:modelValue', 'update:current', 'close', 'finish', 'change'],
  setup(props, { emit, attrs }) {
    return () =>
      h(
        ElTour,
        {
          modelValue: props.modelValue,
          current: props.current,
          mask: props.mask,
          showArrow: props.showArrow,
          showClose: props.showClose,
          type: props.type,
          ...attrs,
          'onUpdate:modelValue': (value) => emit('update:modelValue', value),
          'onUpdate:current': (value) => emit('update:current', value),
          onClose: (current) => emit('close', current),
          onFinish: () => emit('finish'),
          onChange: (current) => emit('change', current),
        },
        () =>
          props.steps.map((step, index) =>
            h(ElTourStep, {
              key: step.key ?? index,
              target: step.target,
              title: step.title,
              description: step.description,
              placement: step.placement,
            }),
          ),
      )
  },
})
