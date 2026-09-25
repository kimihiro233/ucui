import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// UcRadioGroup 统一契约：v-model + options=[{label,value,disabled?}] + disabled + size + type
// 双端都渲染真实 input[type=radio]，选中态 class：
// element label.is-checked / antd label.ant-radio-wrapper-checked（按钮形态加 -button）
const checkedRe = /is-checked|wrapper-checked/

export function radioGroupContract(libName, UcRadioGroup) {
  const options = [
    { label: '选项A', value: 'a' },
    { label: '选项B', value: 'b' },
    { label: '选项C', value: 'c' },
  ]

  describe(`UcRadioGroup 契约 [${libName}]`, () => {
    it('options 渲染全部选项', () => {
      const wrapper = mount(UcRadioGroup, { props: { options } })
      expect(wrapper.text()).toContain('选项A')
      expect(wrapper.text()).toContain('选项B')
      expect(wrapper.text()).toContain('选项C')
      expect(wrapper.findAll('input[type=radio]')).toHaveLength(3)
    })

    it('modelValue 对应选项为选中态', () => {
      const wrapper = mount(UcRadioGroup, { props: { options, modelValue: 'b' } })
      const checked = wrapper
        .findAll('label')
        .filter((label) => checkedRe.test(label.attributes('class') || ''))
      expect(checked).toHaveLength(1)
      expect(checked[0].text()).toContain('选项B')
    })

    it('选中其它项触发 update:modelValue 与 change（参数为选项 value）', async () => {
      const wrapper = mount(UcRadioGroup, { props: { options, modelValue: 'a' } })
      await wrapper.findAll('input[type=radio]')[1].setValue(true)
      // element 的 group change 在 nextTick 后触发
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['b'])
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')[0]).toEqual(['b'])
    })

    it('单项 disabled：该项 input 不可选', () => {
      const disabledOptions = [
        { label: '选项A', value: 'a' },
        { label: '选项B', value: 'b', disabled: true },
      ]
      const wrapper = mount(UcRadioGroup, { props: { options: disabledOptions } })
      const radios = wrapper.findAll('input[type=radio]')
      expect(radios[1].attributes('disabled')).toBeDefined()
      expect(radios[0].attributes('disabled')).toBeUndefined()
    })

    it('整体 disabled：全部 input 不可选', () => {
      const wrapper = mount(UcRadioGroup, { props: { options, disabled: true } })
      wrapper.findAll('input[type=radio]').forEach((radio) => {
        expect(radio.attributes('disabled')).toBeDefined()
      })
    })

    it('type=button 渲染按钮形态', () => {
      const wrapper = mount(UcRadioGroup, { props: { options, type: 'button' } })
      expect(wrapper.html()).toMatch(/el-radio-button|ant-radio-button/)
    })

    it('未选中项点击 disabled 项不触发更新', async () => {
      const disabledOptions = [
        { label: '选项A', value: 'a' },
        { label: '选项B', value: 'b', disabled: true },
      ]
      const wrapper = mount(UcRadioGroup, { props: { options: disabledOptions, modelValue: 'a' } })
      await wrapper.findAll('input[type=radio]')[1].setValue(true)
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })
  })
}
