import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcSwitch 统一契约：所有适配器实现都必须满足这些行为
export function switchContract(name, UcSwitch) {
  describe(`UcSwitch 契约 [${name}]`, () => {
    // element-plus 渲染 div[role=switch]，antd 渲染 button[role=switch]，统一用语义角色选择
    it('渲染开关', () => {
      const wrapper = mount(UcSwitch)
      expect(wrapper.find('[role="switch"]').exists()).toBe(true)
    })

    it('点击切换并触发 update:modelValue', async () => {
      const wrapper = mount(UcSwitch, { props: { modelValue: false } })
      await wrapper.find('[role="switch"]').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([true])
    })

    it('v-model 语法可用', async () => {
      const wrapper = mount({
        components: { UcSwitch },
        data: () => ({ on: false }),
        template: '<UcSwitch v-model="on" />',
      })
      await wrapper.find('[role="switch"]').trigger('click')
      expect(wrapper.vm.on).toBe(true)
    })

    it('change 事件参数为布尔值', async () => {
      const wrapper = mount(UcSwitch, { props: { modelValue: false } })
      await wrapper.find('[role="switch"]').trigger('click')
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')[0]).toEqual([true])
    })

    it('disabled 时点击不触发', async () => {
      const wrapper = mount(UcSwitch, { props: { disabled: true } })
      await wrapper.find('[role="switch"]').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })
  })
}
