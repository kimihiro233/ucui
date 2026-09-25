import { defineComponent, h, ref, watch } from 'vue'
import { ensureInputOtpStyle } from './native-styles'

// UcInputOtp（antd 原生兜底实现）
// ant-design-vue 4.2.6 无 OTP 输入，这里用 N 个原生 input 实现，
// 行为对齐 element ElInputOtp：逐格输入/粘贴分发/方向键与退格导航/
// 填满 emit finish/失焦且有变化 emit change，类名 uc- 前缀对齐 el-input-otp 后缀
ensureInputOtpStyle()

export default defineComponent({
  name: 'UcInputOtp',
  inheritAttrs: false,
  props: {
    modelValue: { type: String, default: '' },
    length: { type: Number, default: 6 },
    mask: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    validator: { type: Function, default: () => () => true },
  },
  emits: ['update:modelValue', 'change', 'finish', 'focus', 'blur'],
  setup(props, { emit, attrs, expose }) {
    const inputRefs = ref([])
    const isFocused = ref(false)
    let modelValueOnFocus = props.modelValue

    const initialValue = () => {
      const value = String(props.modelValue ?? '')
      return Array.from({ length: props.length }, (_, i) => value.charAt(i))
    }
    const innerValue = ref(initialValue())

    watch(
      () => [props.modelValue, props.length],
      () => {
        innerValue.value = initialValue()
      },
    )
    watch(isFocused, (value) => {
      if (value) {
        modelValueOnFocus = props.modelValue
        return
      }
      if (modelValueOnFocus !== props.modelValue) emit('change', props.modelValue)
    })

    const setInputRef = (el, index) => {
      if (el) inputRefs.value[index] = el
    }

    const updateModelValue = (emitFinish = true) => {
      const value = innerValue.value.join('').slice(0, props.length)
      if (value !== props.modelValue) {
        emit('update:modelValue', value)
        if (emitFinish && value.length === props.length) emit('finish', value)
      }
    }

    const focus = (index = 0) => {
      const focusIndex = Math.min(Math.max(index, 0), props.length - 1)
      const target = inputRefs.value[focusIndex]
      if (target && document.activeElement !== target) target.focus()
      if (target && !props.readonly && document.activeElement === target) target.select?.()
    }
    const blur = () => {
      const target = inputRefs.value.find((input) => document.activeElement === input)
      target?.blur()
    }

    expose({ inputRefs, focus, blur })

    const handleFocus = (event) => {
      if (inputRefs.value?.includes(event.relatedTarget)) return
      isFocused.value = true
      emit('focus', event)
    }
    const handleBlur = (event) => {
      if (inputRefs.value?.includes(event.relatedTarget)) return
      isFocused.value = false
      emit('blur', event)
    }

    const handleKeydown = (event, index) => {
      let preventDefault = true
      switch (event.key) {
        case 'Backspace':
          if (props.readonly) break
          innerValue.value[index] = ''
          focus(index - 1)
          updateModelValue()
          break
        case 'Delete':
          if (props.readonly) break
          innerValue.value[index] = ''
          focus(index)
          updateModelValue()
          break
        case 'ArrowUp':
        case 'ArrowLeft':
          focus(index - 1)
          break
        case 'ArrowDown':
        case 'ArrowRight':
          focus(index + 1)
          break
        default:
          preventDefault = false
      }
      if (preventDefault) event.preventDefault()
    }

    const getFirstIndex = (maxIndex) => {
      const index = innerValue.value.findIndex((char, i) => !char && i <= maxIndex)
      return index === -1 ? maxIndex : index
    }
    const castValues = (value, startIndex = 0) => {
      const chars = `${value ?? ''}`.split('')
      const result = []
      for (const char of chars) {
        if (result.length + startIndex >= props.length) break
        if (props.validator(char, result.length + startIndex)) result.push(char)
      }
      return result
    }
    const handleInput = (event, index) => {
      const target = event.target
      const targetIndex = getFirstIndex(index)
      let focusIndex = targetIndex + 1
      let value = target.value
      if (value.length > 1) {
        const chars = castValues(value, targetIndex)
        target.value = innerValue.value[index] ?? ''
        chars.forEach((char, i) => (innerValue.value[targetIndex + i] = char))
        focus(targetIndex + chars.length)
        updateModelValue()
        return
      }
      if (!props.validator(value, targetIndex)) {
        target.value = innerValue.value[index] ?? ''
        value = target.value
        focusIndex = targetIndex
      }
      innerValue.value[targetIndex] = value
      if (targetIndex !== index) target.value = innerValue.value[index] ?? ''
      focus(focusIndex)
      updateModelValue()
    }

    return () => {
      const { class: userClass, style: userStyle, ...restAttrs } = attrs
      return h(
        'div',
        {
          class: ['uc-input-otp', { 'uc-input-otp--disabled': props.disabled }, userClass],
          style: userStyle,
          role: 'group',
          ...restAttrs,
        },
        Array.from({ length: props.length }, (_, index) =>
          h('label', { class: 'uc-input-otp__input-field' }, [
            h('input', {
              ref: (el) => setInputRef(el, index),
              value: innerValue.value[index],
              class: 'uc-input-otp__input',
              type: props.mask ? 'password' : 'text',
              disabled: props.disabled,
              readonly: props.readonly,
              autocomplete: 'one-time-code',
              onFocus: handleFocus,
              onBlur: handleBlur,
              onClick: () => focus(index),
              onKeydown: (event) => handleKeydown(event, index),
              onInput: (event) => handleInput(event, index),
            }),
          ]),
        ),
      )
    }
  },
})
