import { defineComponent, h } from 'vue'
import { ElTransfer } from 'element-plus'

export default defineComponent({
  name: 'UcTransfer',
  inheritAttrs: false,
  props: {
    // 目标侧（右侧）key 数组，v-model 绑定
    modelValue: { type: Array, default: () => [] },
    // 数据源 [{ key, label, disabled? }]
    data: { type: Array, default: () => [] },
    titles: { type: Array, default: () => [] },
    filterable: Boolean,
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { emit, slots, attrs }) {
    return () =>
      h(ElTransfer, {
        modelValue: props.modelValue,
        data: props.data,
        titles: props.titles,
        filterable: props.filterable,
        ...attrs,
        'onUpdate:modelValue': (v) => emit('update:modelValue', v),
        onChange: (value, direction, movedKeys) => emit('change', value, direction, movedKeys),
      }, slots)
  },
})
