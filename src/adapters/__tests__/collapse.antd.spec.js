import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCollapse from '../antd/collapse'
import { collapseContract } from './collapse.contract'

collapseContract('ant-design-vue', UcCollapse)

describe('UcCollapse ant-design-vue 专属映射', () => {
  const items = [
    { key: 'a', title: '一' },
    { key: 'b', title: '二' },
  ]

  it('modelValue 映射为 activeKey，title 映射为 header', () => {
    const wrapper = mount(UcCollapse, {
      props: { items, modelValue: ['a'] },
      slots: { a: '<p>a</p>', b: '<p>b</p>' },
    })
    const collapse = wrapper.findComponent({ name: 'ACollapse' })
    expect(collapse.props('activeKey')).toEqual(['a'])
    const panels = wrapper.findAll('.ant-collapse-item')
    expect(panels[0].classes()).toContain('ant-collapse-item-active')
    expect(panels[0].find('.ant-collapse-header').text()).toContain('一')
  })
})
