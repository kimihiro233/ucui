import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// UcCheckboxGroup 统一契约：v-model(数组) + options=[{label,value,disabled?}] + disabled + min/max(仅 element)
// 双端都渲染真实 input[type=checkbox]，选中态 class：
// element label.is-checked / antd label.ant-checkbox-wrapper-checked
const checkedRe = /is-checked|wrapper-checked/

export function checkboxGroupContract(libName, UcCheckboxGroup) {
  const options = [
    { label: '苹果', value: 'apple' },
    { label: '香蕉', value: 'banana' },
    { label: '橘子', value: 'orange' },
  ]

  describe(`UcCheckboxGroup 契约 [${libName}]`, () => {
    it('options 渲染全部选项', () => {
      const wrapper = mount(UcCheckboxGroup, { props: { options } })
      expect(wrapper.text()).toContain('苹果')
      expect(wrapper.text()).toContain('香蕉')
      expect(wrapper.text()).toContain('橘子')
      expect(wrapper.findAll('input[type=checkbox]')).toHaveLength(3)
    })

    it('modelValue 数组对应选项为选中态', () => {
      const wrapper = mount(UcCheckboxGroup, { props: { options, modelValue: ['apple', 'orange'] } })
      const checked = wrapper
        .findAll('label')
        .filter((label) => checkedRe.test(label.attributes('class') || ''))
      expect(checked).toHaveLength(2)
      expect(checked[0].text()).toContain('苹果')
      expect(checked[1].text()).toContain('橘子')
    })

    it('勾选触发 update:modelValue 与 change（值数组包含新勾选值）', async () => {
      const wrapper = mount(UcCheckboxGroup, { props: { options, modelValue: [] } })
      await wrapper.findAll('input[type=checkbox]')[1].setValue(true)
      // element 的 group change 在 nextTick 后触发
      await nextTick()
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0][0]).toContain('banana')
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')[0][0]).toContain('banana')
    })

    it('取消勾选从值数组中移除', async () => {
      const wrapper = mount(UcCheckboxGroup, { props: { options, modelValue: ['apple', 'banana'] } })
      await wrapper.findAll('input[type=checkbox]')[0].setValue(false)
      await nextTick()
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      const latest = emitted.at(-1)[0]
      expect(latest).not.toContain('apple')
      expect(latest).toContain('banana')
    })

    it('单项 disabled：该项 input 不可选', () => {
      const disabledOptions = [
        { label: '苹果', value: 'apple' },
        { label: '香蕉', value: 'banana', disabled: true },
      ]
      const wrapper = mount(UcCheckboxGroup, { props: { options: disabledOptions } })
      const boxes = wrapper.findAll('input[type=checkbox]')
      expect(boxes[1].attributes('disabled')).toBeDefined()
      expect(boxes[0].attributes('disabled')).toBeUndefined()
    })

    it('整体 disabled：全部 input 不可选', () => {
      const wrapper = mount(UcCheckboxGroup, { props: { options, disabled: true } })
      wrapper.findAll('input[type=checkbox]').forEach((box) => {
        expect(box.attributes('disabled')).toBeDefined()
      })
    })
  })
}
