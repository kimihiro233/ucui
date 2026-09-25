import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcDatePicker 统一契约：所有适配器实现都必须满足这些行为
// 日历弹层依赖 popper，契约只测输入框与值映射，不做弹层断言
export function datePickerContract(name, UcDatePicker) {
  const findInput = (wrapper) =>
    wrapper.find('.el-date-editor input, .ant-picker input')

  describe(`UcDatePicker 契约 [${name}]`, () => {
    it('渲染日期选择器', () => {
      const wrapper = mount(UcDatePicker)
      expect(findInput(wrapper).exists()).toBe(true)
    })

    it('modelValue 显示为格式化文本', () => {
      const wrapper = mount(UcDatePicker, {
        props: { modelValue: '2026-09-24' },
      })
      expect(findInput(wrapper).element.value).toBe('2026-09-24')
    })

    it('format 透传到底层', () => {
      const wrapper = mount(UcDatePicker, {
        props: { modelValue: '', format: 'YYYY/MM/DD' },
      })
      const comp =
        name === 'element-plus'
          ? wrapper.findComponent({ name: 'ElDatePicker' })
          : wrapper.findComponent({ name: 'ADatePicker' })
      expect(comp.props('format')).toBe('YYYY/MM/DD')
    })

    it('disabled 时输入框禁用', () => {
      const wrapper = mount(UcDatePicker, { props: { disabled: true } })
      expect(findInput(wrapper).attributes('disabled')).toBeDefined()
    })
  })
}
