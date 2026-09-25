import { defineComponent, h, ref } from 'vue'
import { ElForm, ElFormItem } from 'element-plus'

// 统一 rules 结构：{ 字段名: [{ required, message, trigger }] }
// element 的 FormItem 用 prop 指定字段，与统一层一致
export const UcForm = defineComponent({
  name: 'UcForm',
  inheritAttrs: false,
  props: {
    model: { type: Object, required: true },
    rules: { type: Object, default: () => ({}) },
    labelWidth: { type: [String, Number], default: undefined },
    // 标签对齐：left | right | top
    labelPosition: { type: String, default: 'right' },
    disabled: Boolean,
  },
  setup(props, { slots, attrs, expose }) {
    const formRef = ref()
    // 统一暴露校验方法，屏蔽底层 ref 差异
    expose({
      validate: () => formRef.value.validate(),
      resetFields: () => formRef.value.resetFields(),
      clearValidate: () => formRef.value.clearValidate(),
    })
    return () =>
      h(
        ElForm,
        {
          ref: formRef,
          model: props.model,
          rules: props.rules,
          labelWidth: props.labelWidth,
          labelPosition: props.labelPosition,
          disabled: props.disabled,
          ...attrs,
        },
        slots,
      )
  },
})

export const UcFormItem = defineComponent({
  name: 'UcFormItem',
  inheritAttrs: false,
  props: {
    // 字段名，对应 model 的 key
    prop: { type: String, default: '' },
    label: String,
    required: Boolean,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        ElFormItem,
        {
          prop: props.prop,
          label: props.label,
          required: props.required,
          ...attrs,
        },
        slots,
      )
  },
})
