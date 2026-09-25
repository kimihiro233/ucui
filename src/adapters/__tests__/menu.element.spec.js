import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcMenu from '../element/menu'
import { menuContract } from './menu.contract'

const items = [
  { key: 'home', label: '首页' },
  {
    key: 'system',
    label: '系统',
    children: [{ key: 'user', label: '用户管理' }],
  },
]

menuContract('element-plus', UcMenu)

describe('UcMenu element-plus 专属映射', () => {
  it('内部使用 ElMenu/ElMenuItem/ElSubMenu', () => {
    const wrapper = mount(UcMenu, { props: { items } })
    expect(wrapper.findComponent({ name: 'ElMenu' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ElMenuItem' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ElSubMenu' }).exists()).toBe(true)
  })

  it('trigger=click 映射为 menuTrigger=click', () => {
    const wrapper = mount(UcMenu, { props: { items, trigger: 'click' } })
    expect(wrapper.findComponent({ name: 'ElMenu' }).props('menuTrigger')).toBe(
      'click',
    )
  })

  it('collapse 与 uniqueOpened 直传 ElMenu', () => {
    const wrapper = mount(UcMenu, {
      props: { items, collapse: true, uniqueOpened: true },
    })
    const elMenu = wrapper.findComponent({ name: 'ElMenu' })
    expect(elMenu.props('collapse')).toBe(true)
    expect(elMenu.props('uniqueOpened')).toBe(true)
  })
})
