import { defineComponent, h, ref } from 'vue'
import { ElInputOtp } from 'element-plus'

// 统一 API：v-model(string) / length(默认 6) / mask / disabled / readonly / validator
// emits：update:modelValue(每次输入) / finish(填满) / change(失焦且有变化) / focus / blur
export default defineComponent({
  name: 'UcInputOtp',
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: '' },
    length: { type: Number, default: 6 },
    mask: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    // type 为 Function 时 Vue 不做工厂调用，default 即校验函数本身
    validator: { type: Function, default: () => () => true },
  },
  emits: ['update:modelValue', 'change', 'finish', 'focus', 'blur'],
  setup(props, { emit, attrs, expose }) {
    const inner = ref(null)
    expose({
      focus: (...args) => inner.value?.focus?.(...args),
      blur: (...args) => inner.value?.blur?.(...args),
    })
    return () =>
      h(ElInputOtp, {
        ref: inner,
        modelValue: props.modelValue,
        'onUpdate:modelValue': (value) => emit('update:modelValue', value),
        length: props.length,
        mask: props.mask,
        disabled: props.disabled,
        readonly: props.readonly,
        validator: props.validator,
        ...attrs,
        // 事件归一化放 attrs 之后，防止被覆盖
        onChange: (value) => emit('change', value),
        onFinish: (value) => emit('finish', value),
        onFocus: (e) => emit('focus', e),
        onBlur: (e) => emit('blur', e),
      })
  },
})
