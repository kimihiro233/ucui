import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcTabs from '../antd/tabs'
import { tabsContract } from './tabs.contract'

tabsContract('ant-design-vue', UcTabs)

describe('UcTabs ant-design-vue 专属映射', () => {
  const items = [
    { key: 'a', label: 'A' },
    { key: 'b', label: 'B' },
  ]

  it('渲染 ant-tabs', () => {
    const wrapper = mount(UcTabs, {
      props: { modelValue: 'a', items },
      slots: { a: '<p>A</p>', b: '<p>B</p>' },
    })
    expect(wrapper.find('.ant-tabs').exists()).toBe(true)
  })

  it('激活页签 ant-tabs-tab-active', () => {
    const wrapper = mount(UcTabs, {
      props: { modelValue: 'b', items },
      slots: { a: '<p>A</p>', b: '<p>B</p>' },
    })
    expect(wrapper.find('.ant-tabs-tab-active').text()).toContain('B')
  })

  it('只渲染激活面板的内容', () => {
    const wrapper = mount(UcTabs, {
      props: { modelValue: 'a', items },
      slots: { a: '<p class="only-a">A</p>', b: '<p class="only-b">B</p>' },
    })
    expect(wrapper.find('.only-a').exists()).toBe(true)
    expect(wrapper.find('.only-b').exists()).toBe(false)
  })
})
