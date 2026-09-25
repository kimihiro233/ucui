import { defineComponent, h, ref } from 'vue'
import { Form, FormItem } from 'ant-design-vue'

// 统一 rules 结构：{ 字段名: [{ required, message, trigger }] }
// antd 的 FormItem 用 name 指定字段（element 叫 prop），适配层负责转换
export const UcForm = defineComponent({
  name: 'UcForm',
  inheritAttrs: false,
  props: {
    model: { type: Object, required: true },
    rules: { type: Object, default: () => ({}) },
    labelWidth: { type: [String, Number], default: undefined },
    // 标签对齐：left | right | top（antd 没有 right，映射为 antd 的 layout）
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
        Form,
        {
          ref: formRef,
          model: props.model,
          rules: props.rules,
          disabled: props.disabled,
          // labelWidth 映射为 labelCol 的 style；labelPosition=top 映射为 vertical 布局
          labelCol: props.labelWidth
            ? { style: { width: typeof props.labelWidth === 'number' ? `${props.labelWidth}px` : props.labelWidth } }
            : undefined,
          layout: props.labelPosition === 'top' ? 'vertical' : 'horizontal',
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
    prop: { type: String, default: '' },
    label: String,
    required: Boolean,
  },
  setup(props, { slots, attrs }) {
    return () =>
      h(
        FormItem,
        {
          // 统一层的 prop 映射为 antd 的 name
          name: props.prop,
          label: props.label,
          required: props.required,
          ...attrs,
        },
        slots,
      )
  },
})
