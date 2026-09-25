import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcTabs from '../element/tabs'
import { tabsContract } from './tabs.contract'

tabsContract('element-plus', UcTabs)

describe('UcTabs element-plus 专属映射', () => {
  const items = [
    { key: 'a', label: 'A' },
    { key: 'b', label: 'B' },
  ]

  it('渲染 el-tabs 与 el-tab-pane', () => {
    const wrapper = mount(UcTabs, {
      props: { modelValue: 'a', items },
      slots: { a: '<p>A</p>', b: '<p>B</p>' },
    })
    expect(wrapper.find('.el-tabs').exists()).toBe(true)
    expect(wrapper.findAll('.el-tab-pane').length).toBe(2)
  })

  it('激活页签头 is-active', () => {
    const wrapper = mount(UcTabs, {
      props: { modelValue: 'b', items },
      slots: { a: '<p>A</p>', b: '<p>B</p>' },
    })
    const active = wrapper.findAll('.el-tabs__item').find((n) => n.classes().includes('is-active'))
    expect(active.text()).toContain('B')
  })
})
