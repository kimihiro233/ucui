import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcInput 统一契约：所有适配器实现都必须满足这些行为
export function inputContract(name, UcInput) {
  describe(`UcInput 契约 [${name}]`, () => {
    it('渲染输入框', () => {
      const wrapper = mount(UcInput)
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('modelValue 显示在输入框中', () => {
      const wrapper = mount(UcInput, { props: { modelValue: 'hello' } })
      expect(wrapper.find('input').element.value).toBe('hello')
    })

    it('输入时触发 update:modelValue', async () => {
      const wrapper = mount(UcInput)
      await wrapper.find('input').setValue('abc')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['abc'])
    })

    it('v-model 语法可用', async () => {
      const wrapper = mount({
        components: { UcInput },
        data: () => ({ text: '' }),
        template: '<UcInput v-model="text" />',
      })
      await wrapper.find('input').setValue('xyz')
      expect(wrapper.vm.text).toBe('xyz')
    })

    it('change 事件参数为字符串值', async () => {
      const wrapper = mount(UcInput)
      await wrapper.find('input').setValue('abc')
      await wrapper.find('input').trigger('change')
      const changes = wrapper.emitted('change')
      expect(changes).toBeTruthy()
      expect(changes[0]).toEqual(['abc'])
    })

    it('placeholder 生效', () => {
      const wrapper = mount(UcInput, { props: { placeholder: '请输入' } })
      expect(wrapper.find('input').attributes('placeholder')).toBe('请输入')
    })

    it('disabled 生效', () => {
      const wrapper = mount(UcInput, { props: { disabled: true } })
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('clearable 可开启清除能力', () => {
      const wrapper = mount(UcInput, { props: { modelValue: 'hello', clearable: true } })
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('size 三档可设置', () => {
      const sizes = ['large', 'default', 'small']
      for (const size of sizes) {
        const wrapper = mount(UcInput, { props: { size } })
        expect(wrapper.find('input').exists()).toBe(true)
      }
    })
  })
}
