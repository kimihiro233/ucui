import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcMenu from '../antd/menu'
import { menuContract } from './menu.contract'

const items = [
  { key: 'home', label: '首页' },
  {
    key: 'system',
    label: '系统',
    children: [{ key: 'user', label: '用户管理' }],
  },
]

menuContract('ant-design-vue', UcMenu)

describe('UcMenu ant-design-vue 专属映射', () => {
  it('内部使用 AMenu 且 items 直接透传', () => {
    const wrapper = mount(UcMenu, { props: { items } })
    const menu = wrapper.findComponent({ name: 'AMenu' })
    expect(menu.exists()).toBe(true)
    expect(menu.props('items')).toEqual(items)
  })

  it('vertical 统一模式映射为 antd inline', () => {
    const wrapper = mount(UcMenu, { props: { items, mode: 'vertical' } })
    expect(wrapper.findComponent({ name: 'AMenu' }).props('mode')).toBe('inline')
  })

  it('trigger=click 映射为 triggerSubMenuAction=click', () => {
    const wrapper = mount(UcMenu, { props: { items, trigger: 'click' } })
    expect(
      wrapper.findComponent({ name: 'AMenu' }).props('triggerSubMenuAction'),
    ).toBe('click')
  })

  it('collapse 映射为 inlineCollapsed', () => {
    const wrapper = mount(UcMenu, { props: { items, collapse: true } })
    expect(wrapper.findComponent({ name: 'AMenu' }).props('inlineCollapsed')).toBe(
      true,
    )
  })

  it('uniqueOpened：连续展开两个子菜单时只保留最新的', () => {
    const manyItems = [
      {
        key: 'g1',
        label: '分组1',
        children: [{ key: 'a', label: 'A' }],
      },
      {
        key: 'g2',
        label: '分组2',
        children: [{ key: 'b', label: 'B' }],
      },
    ]
    const wrapper = mount(UcMenu, {
      props: { items: manyItems, uniqueOpened: true },
    })
    const menu = wrapper.findComponent({ name: 'AMenu' })
    menu.props('onOpenChange')(['g1'])
    menu.props('onOpenChange')(['g1', 'g2'])
    expect(wrapper.emitted('open-change')[0]).toEqual([['g1']])
    expect(wrapper.emitted('open-change')[1]).toEqual([['g2']])
  })
})
