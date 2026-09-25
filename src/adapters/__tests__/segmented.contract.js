import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcSegmented 统一契约：v-model + options=[{label,value,disabled?}]
// 双端都渲染真实 input[type=radio]（label 包裹），选中态 class：
// element label.is-selected / antd label.ant-segmented-item-selected
export function segmentedContract(libName, UcSegmented) {
  const options = [
    { label: '日', value: 'day' },
    { label: '周', value: 'week' },
    { label: '月', value: 'month' },
  ]

  describe(`UcSegmented 契约 [${libName}]`, () => {
    it('渲染所有选项标签', () => {
      const wrapper = mount(UcSegmented, { props: { options } })
      expect(wrapper.text()).toContain('日')
      expect(wrapper.text()).toContain('周')
      expect(wrapper.text()).toContain('月')
      expect(wrapper.findAll('input[type=radio]')).toHaveLength(3)
    })

    it('modelValue 对应选项为选中态', () => {
      const wrapper = mount(UcSegmented, { props: { options, modelValue: 'week' } })
      const radios = wrapper.findAll('input[type=radio]')
      expect(radios[1].element.checked).toBe(true)
      expect(radios[0].element.checked).toBe(false)
      expect(wrapper.text()).toBeTruthy()
    })

    it('点击选项触发 update:modelValue 与 change', async () => {
      const wrapper = mount(UcSegmented, { props: { options, modelValue: 'day' } })
      await wrapper.findAll('input[type=radio]')[2].setValue(true)
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['month'])
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')[0]).toEqual(['month'])
    })

    it('单项 disabled：该项不可选', () => {
      const disabledOptions = [
        { label: '日', value: 'day' },
        { label: '周', value: 'week', disabled: true },
      ]
      const wrapper = mount(UcSegmented, { props: { options: disabledOptions } })
      const radios = wrapper.findAll('input[type=radio]')
      expect(radios[1].attributes('disabled')).toBeDefined()
      expect(radios[0].attributes('disabled')).toBeUndefined()
    })

    it('整体 disabled：全部不可选', () => {
      const wrapper = mount(UcSegmented, { props: { options, disabled: true } })
      wrapper.findAll('input[type=radio]').forEach((radio) => {
        expect(radio.attributes('disabled')).toBeDefined()
      })
    })

    it('block 时占满父级宽度', () => {
      const wrapper = mount(UcSegmented, { props: { options, block: true } })
      expect(wrapper.html()).toMatch(/is-block|ant-segmented-block/)
    })
  })
}
