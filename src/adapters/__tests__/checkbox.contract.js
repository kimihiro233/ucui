import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcCheckbox 统一契约
export function checkboxContract(name, UcCheckbox) {
  describe(`UcCheckbox 契约 [${name}]`, () => {
    it('渲染复选框', () => {
      const wrapper = mount(UcCheckbox)
      expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
    })

    it('默认插槽渲染为标签文字', () => {
      const wrapper = mount(UcCheckbox, { slots: { default: '同意协议' } })
      expect(wrapper.text()).toContain('同意协议')
    })

    it('勾选触发 update:modelValue', async () => {
      const wrapper = mount(UcCheckbox, { props: { modelValue: false } })
      await wrapper.find('input[type="checkbox"]').setValue(true)
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
    })

    it('v-model 语法可用', async () => {
      const wrapper = mount({
        components: { UcCheckbox },
        data: () => ({ checked: false }),
        template: '<UcCheckbox v-model="checked">选项</UcCheckbox>',
      })
      await wrapper.find('input[type="checkbox"]').setValue(true)
      expect(wrapper.vm.checked).toBe(true)
    })

    it('change 事件参数为布尔值', async () => {
      const wrapper = mount(UcCheckbox, { props: { modelValue: false } })
      await wrapper.find('input[type="checkbox"]').setValue(true)
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')[0]).toEqual([true])
    })

    it('disabled 时不可勾选', async () => {
      const wrapper = mount(UcCheckbox, { props: { modelValue: false, disabled: true } })
      await wrapper.find('input[type="checkbox"]').setValue(true)
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })
  })
}
