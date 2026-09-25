import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCheckboxGroup from '../antd/checkbox-group'
import { checkboxGroupContract } from './checkbox-group.contract'

const options = [
  { label: '苹果', value: 'apple' },
  { label: '香蕉', value: 'banana' },
]

checkboxGroupContract('ant-design-vue', UcCheckboxGroup)

describe('UcCheckboxGroup ant-design-vue 专属映射', () => {
  it('内部使用 ACheckboxGroup', () => {
    const wrapper = mount(UcCheckboxGroup, { props: { options } })
    expect(wrapper.findComponent({ name: 'ACheckboxGroup' }).exists()).toBe(true)
  })

  it('选中项 label 带 ant-checkbox-wrapper-checked', () => {
    const wrapper = mount(UcCheckboxGroup, { props: { options, modelValue: ['banana'] } })
    const labels = wrapper.findAll('label')
    const checkedLabel = labels.find((l) =>
      (l.attributes('class') || '').includes('ant-checkbox-wrapper-checked'),
    )
    expect(checkedLabel).toBeTruthy()
    expect(checkedLabel.text()).toContain('香蕉')
  })
})
