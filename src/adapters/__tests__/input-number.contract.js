import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcInputNumber 统一契约：所有适配器实现都必须满足这些行为
export function inputNumberContract(name, UcInputNumber) {
  const findInput = (wrapper) =>
    wrapper.find('.el-input-number input, .ant-input-number-input')

  describe(`UcInputNumber 契约 [${name}]`, () => {
    it('渲染数字输入框', () => {
      const wrapper = mount(UcInputNumber)
      expect(findInput(wrapper).exists()).toBe(true)
    })

    it('modelValue 显示在输入框', () => {
      const wrapper = mount(UcInputNumber, { props: { modelValue: 42 } })
      expect(findInput(wrapper).element.value).toBe('42')
    })

    it('min/max/step 透传到底层', () => {
      const wrapper = mount(UcInputNumber, {
        props: { modelValue: 5, min: 0, max: 10, step: 2 },
      })
      const comp =
        name === 'element-plus'
          ? wrapper.findComponent({ name: 'ElInputNumber' })
          : wrapper.findComponent({ name: 'AInputNumber' })
      expect(comp.props('min')).toBe(0)
      expect(comp.props('max')).toBe(10)
      expect(comp.props('step')).toBe(2)
    })

    it('disabled 时输入框禁用', () => {
      const wrapper = mount(UcInputNumber, { props: { disabled: true } })
      expect(findInput(wrapper).attributes('disabled')).toBeDefined()
    })
  })
}
