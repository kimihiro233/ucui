import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcRadioGroup from '../antd/radio-group'
import { radioGroupContract } from './radio-group.contract'

const options = [
  { label: '选项A', value: 'a' },
  { label: '选项B', value: 'b' },
]

radioGroupContract('ant-design-vue', UcRadioGroup)

describe('UcRadioGroup ant-design-vue 专属映射', () => {
  it('内部使用 ARadioGroup', () => {
    const wrapper = mount(UcRadioGroup, { props: { options } })
    expect(wrapper.findComponent({ name: 'ARadioGroup' }).exists()).toBe(true)
  })

  it('选中项 label 带 ant-radio-wrapper-checked', () => {
    const wrapper = mount(UcRadioGroup, { props: { options, modelValue: 'b' } })
    const labels = wrapper.findAll('label')
    const checkedLabel = labels.find((l) =>
      (l.attributes('class') || '').includes('ant-radio-wrapper-checked'),
    )
    expect(checkedLabel).toBeTruthy()
    expect(checkedLabel.text()).toContain('选项B')
  })

  it('size=small 映射为 ant-radio-group-small', () => {
    const wrapper = mount(UcRadioGroup, { props: { options, size: 'small' } })
    expect(wrapper.find('.ant-radio-group-small').exists()).toBe(true)
  })

  it('type=button 渲染 ant-radio-button-wrapper', () => {
    const wrapper = mount(UcRadioGroup, { props: { options, type: 'button' } })
    expect(wrapper.find('.ant-radio-button-wrapper').exists()).toBe(true)
  })
})
