import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// UcRadio 统一契约（单选按钮的布尔选中态模式）
export function radioContract(name, UcRadio) {
  describe(`UcRadio 契约 [${name}]`, () => {
    it('渲染单选框', () => {
      const wrapper = mount(UcRadio)
      expect(wrapper.find('input[type="radio"]').exists()).toBe(true)
    })

    it('默认插槽渲染为标签文字', () => {
      const wrapper = mount(UcRadio, { slots: { default: '选项A' } })
      expect(wrapper.text()).toContain('选项A')
    })

    it('选中触发 update:modelValue（true）', async () => {
      const wrapper = mount(UcRadio, { props: { modelValue: false } })
      await wrapper.find('input[type="radio"]').setValue(true)
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
    })

    it('v-model 语法可用', async () => {
      const wrapper = mount({
        components: { UcRadio },
        data: () => ({ picked: false }),
        template: '<UcRadio v-model="picked">选项</UcRadio>',
      })
      await wrapper.find('input[type="radio"]').setValue(true)
      expect(wrapper.vm.picked).toBe(true)
    })

    it('change 事件参数为布尔值', async () => {
      const wrapper = mount({
        components: { UcRadio },
        data: () => ({ picked: false }),
        template: '<UcRadio v-model="picked">选项</UcRadio>',
      })
      await wrapper.find('input[type="radio"]').setValue(true)
      await nextTick()
      await nextTick()
      const radio = wrapper.findComponent(UcRadio)
      expect(radio.emitted('change')).toBeTruthy()
      expect(radio.emitted('change')[0]).toEqual([true])
    })

    it('disabled 生效', () => {
      const wrapper = mount(UcRadio, { props: { disabled: true } })
      expect(wrapper.find('input[type="radio"]').attributes('disabled')).toBeDefined()
    })
  })
}
