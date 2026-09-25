import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCheckboxGroup from '../element/checkbox-group'
import { checkboxGroupContract } from './checkbox-group.contract'

const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
]

checkboxGroupContract('element-plus', UcCheckboxGroup)

describe('UcCheckboxGroup element-plus 专属映射', () => {
  it('内部使用 ElCheckboxGroup', () => {
    const wrapper = mount(UcCheckboxGroup, { props: { options } })
    expect(wrapper.findComponent({ name: 'ElCheckboxGroup' }).exists()).toBe(true)
  })

  it('选中项 label 带 is-checked', () => {
    const wrapper = mount(UcCheckboxGroup, { props: { options, modelValue: ['banana'] } })
    const labels = wrapper.findAll('label')
    const checkedLabel = labels.find((l) =>
      (l.attributes('class') || '').includes('is-checked'),
    )
    expect(checkedLabel).toBeTruthy()
    expect(checkedLabel.text()).toContain('香蕉')
  })

  it('支持 max 限制（element 原生）', () => {
    const wrapper = mount(UcCheckboxGroup, {
      props: { options, modelValue: [], max: 1 },
    })
    expect(wrapper.findComponent({ name: 'ElCheckboxGroup' }).props('max')).toBe(1)
  })
})
