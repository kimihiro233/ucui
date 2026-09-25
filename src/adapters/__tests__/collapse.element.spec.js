import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCollapse from '../element/collapse'
import { collapseContract } from './collapse.contract'

collapseContract('element-plus', UcCollapse)

describe('UcCollapse element-plus 专属映射', () => {
  const items = [
    { key: 'a', title: '一' },
    { key: 'b', title: '二' },
  ]

  it('渲染 ElCollapseItem 且 name/title 正确', () => {
    const wrapper = mount(UcCollapse, {
      props: { items, modelValue: ['b'] },
      slots: { a: '<p>a</p>', b: '<p>b</p>' },
    })
    const panels = wrapper.findAll('.el-collapse-item')
    expect(panels.length).toBe(2)
    expect(panels[1].classes()).toContain('is-active')
  })

  it('accordion 透传', () => {
    const wrapper = mount(UcCollapse, {
      props: { items, accordion: true, modelValue: 'a' },
      slots: { a: '<p>a</p>' },
    })
    expect(wrapper.findComponent({ name: 'ElCollapse' }).props('accordion')).toBe(true)
  })
})
