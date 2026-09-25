import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcSegmented from '../antd/segmented'
import { segmentedContract } from './segmented.contract'

const options = [
  { label: '日', value: 'day' },
  { label: '周', value: 'week' },
]

segmentedContract('ant-design-vue', UcSegmented)

describe('UcSegmented ant-design-vue 专属映射', () => {
  it('内部使用 ASegmented', () => {
    const wrapper = mount(UcSegmented, { props: { options } })
    expect(wrapper.findComponent({ name: 'ASegmented' }).exists()).toBe(true)
  })

  it('选中项 label 带 ant-segmented-item-selected', () => {
    const wrapper = mount(UcSegmented, { props: { options, modelValue: 'week' } })
    const labels = wrapper.findAll('label')
    expect(labels[1].classes()).toContain('ant-segmented-item-selected')
    expect(labels[0].classes()).not.toContain('ant-segmented-item-selected')
  })

  it('size=small 映射为 ant-segmented-sm', () => {
    const wrapper = mount(UcSegmented, { props: { options, size: 'small' } })
    expect(wrapper.find('.ant-segmented-sm').exists()).toBe(true)
  })

  it('size=default 映射为 middle（无 sm/lg 类）', () => {
    const wrapper = mount(UcSegmented, { props: { options, size: 'default' } })
    expect(wrapper.find('.ant-segmented-sm').exists()).toBe(false)
    expect(wrapper.find('.ant-segmented-lg').exists()).toBe(false)
  })
})
