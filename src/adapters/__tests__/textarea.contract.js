import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcTextarea 统一契约
export function textareaContract(name, UcTextarea) {
  describe(`UcTextarea 契约 [${name}]`, () => {
    it('渲染 textarea 元素', () => {
      const wrapper = mount(UcTextarea)
      expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('modelValue 显示在 textarea 中', () => {
      const wrapper = mount(UcTextarea, { props: { modelValue: '多行文本' } })
      expect(wrapper.find('textarea').element.value).toBe('多行文本')
    })

    it('输入触发 update:modelValue', async () => {
      const wrapper = mount(UcTextarea)
      await wrapper.find('textarea').setValue('abc')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['abc'])
    })

    it('v-model 语法可用', async () => {
      const wrapper = mount({
        components: { UcTextarea },
        data: () => ({ text: '' }),
        template: '<UcTextarea v-model="text" />',
      })
      await wrapper.find('textarea').setValue('hello')
      expect(wrapper.vm.text).toBe('hello')
    })

    it('change 事件参数为字符串值', async () => {
      const wrapper = mount(UcTextarea)
      await wrapper.find('textarea').setValue('abc')
      await wrapper.find('textarea').trigger('change')
      const changes = wrapper.emitted('change')
      expect(changes).toBeTruthy()
      expect(changes[0]).toEqual(['abc'])
    })

    it('rows 生效', () => {
      const wrapper = mount(UcTextarea, { props: { rows: 5 } })
      expect(wrapper.find('textarea').attributes('rows')).toBe('5')
    })

    it('placeholder 生效', () => {
      const wrapper = mount(UcTextarea, { props: { placeholder: '请输入' } })
      expect(wrapper.find('textarea').attributes('placeholder')).toBe('请输入')
    })

    it('disabled 生效', () => {
      const wrapper = mount(UcTextarea, { props: { disabled: true } })
      expect(wrapper.find('textarea').attributes('disabled')).toBeDefined()
    })
  })
}
