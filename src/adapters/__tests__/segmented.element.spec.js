import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcSegmented from '../element/segmented'
import { segmentedContract } from './segmented.contract'

const options = [
  { label: '日', value: 'day' },
  { label: '周', value: 'week' },
]

segmentedContract('element-plus', UcSegmented)

describe('UcSegmented element-plus 专属映射', () => {
  it('渲染 el-segmented 结构', () => {
    const wrapper = mount(UcSegmented, { props: { options } })
    expect(wrapper.find('.el-segmented').exists()).toBe(true)
  })

  it('选中项 label 带 is-selected', () => {
    const wrapper = mount(UcSegmented, { props: { options, modelValue: 'week' } })
    const labels = wrapper.findAll('label')
    expect(labels[1].classes()).toContain('is-selected')
    expect(labels[0].classes()).not.toContain('is-selected')
  })

  it('size=small 映射为 el-segmented--small', () => {
    const wrapper = mount(UcSegmented, { props: { options, size: 'small' } })
    expect(wrapper.find('.el-segmented--small').exists()).toBe(true)
  })
})
