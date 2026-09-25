import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcRadioGroup from '../element/radio-group'
import { radioGroupContract } from './radio-group.contract'

const options = [
  { label: '选项A', value: 'a' },
  { label: '选项B', value: 'b' },
]

radioGroupContract('element-plus', UcRadioGroup)

describe('UcRadioGroup element-plus 专属映射', () => {
  it('内部使用 ElRadioGroup', () => {
    const wrapper = mount(UcRadioGroup, { props: { options } })
    expect(wrapper.findComponent({ name: 'ElRadioGroup' }).exists()).toBe(true)
  })

  it('选中项 label 带 is-checked', () => {
    const wrapper = mount(UcRadioGroup, { props: { options, modelValue: 'b' } })
    const labels = wrapper.findAll('label')
    const checkedLabel = labels.find((l) =>
      (l.attributes('class') || '').includes('is-checked'),
    )
    expect(checkedLabel).toBeTruthy()
    expect(checkedLabel.text()).toContain('选项B')
  })

  it('size=small 映射到子项 el-radio--small', () => {
    const wrapper = mount(UcRadioGroup, { props: { options, size: 'small' } })
    expect(wrapper.find('.el-radio--small').exists()).toBe(true)
  })

  it('type=button 渲染 el-radio-button', () => {
    const wrapper = mount(UcRadioGroup, { props: { options, type: 'button' } })
    expect(wrapper.find('.el-radio-button').exists()).toBe(true)
  })
})
