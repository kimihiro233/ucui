import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcMenu 统一契约：v-model + items 数据驱动 + 子菜单展开 + @select/@open-change
// 跨端结构：
//   叶子项 element .el-menu-item / antd .ant-menu-item
//   子菜单标题 element .el-sub-menu__title / antd .ant-menu-submenu-title
//   子菜单列表 element ul.el-menu--inline / antd ul.ant-menu-sub（v-show 切换）
export function menuContract(libName, UcMenu) {
  const items = [
    { key: 'home', label: '首页' },
    {
      key: 'system',
      label: '系统',
      children: [
        { key: 'user', label: '用户管理' },
        { key: 'role', label: '角色管理' },
      ],
    },
    { key: 'about', label: '关于', disabled: true },
  ]

  const normalize = (text) => text.replace(/\s+/g, '')

  const findLeaf = (wrapper, text) =>
    wrapper
      .findAll('.el-menu-item, .ant-menu-item')
      .find((node) => normalize(node.text()) === text)

  const findSubTitle = (wrapper, text) =>
    wrapper
      .findAll('.el-sub-menu__title, .ant-menu-submenu-title')
      .find((node) => normalize(node.text()) === text)

  describe(`UcMenu 契约 [${libName}]`, () => {
    it('渲染菜单容器与根级菜单项', () => {
      const wrapper = mount(UcMenu, { props: { items } })
      expect(wrapper.find('ul').exists()).toBe(true)
      expect(findLeaf(wrapper, '首页')).toBeTruthy()
      expect(findSubTitle(wrapper, '系统')).toBeTruthy()
      expect(findLeaf(wrapper, '关于')).toBeTruthy()
    })

    it('子菜单默认收起：子列表 display=none', () => {
      const wrapper = mount(UcMenu, { props: { items } })
      const subUl = wrapper.find('.el-menu--inline, .ant-menu-sub')
      expect(subUl.exists()).toBe(true)
      expect(subUl.element.style.display).toBe('none')
    })

    it('点击叶子项：update:modelValue + select(key,keyPath)', async () => {
      const wrapper = mount(UcMenu, { props: { items } })
      await findLeaf(wrapper, '首页').trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['home'])
      expect(wrapper.emitted('select')).toBeTruthy()
      expect(wrapper.emitted('select')[0]).toEqual(['home', ['home']])
    })

    it('modelValue 对应项带激活态 class', () => {
      const wrapper = mount(UcMenu, { props: { items, modelValue: 'home' } })
      const home = findLeaf(wrapper, '首页')
      // element 选中类 is-active；antd 选中类 ant-menu-item-selected
      expect(
        home.classes().some((c) => c.includes('active') || c.includes('selected')),
      ).toBe(true)
    })

    it('disabled 项带禁用 class 且点击不触发 select', async () => {
      const wrapper = mount(UcMenu, { props: { items } })
      const about = findLeaf(wrapper, '关于')
      expect(about.classes().some((c) => c.includes('disabled'))).toBe(true)
      await about.trigger('click')
      expect(wrapper.emitted('select')).toBeFalsy()
      expect(wrapper.emitted('update:modelValue')).toBeFalsy()
    })

    it('点击子菜单标题：open-change 且子列表展开', async () => {
      const wrapper = mount(UcMenu, { props: { items } })
      await findSubTitle(wrapper, '系统').trigger('click')
      expect(wrapper.emitted('open-change')).toBeTruthy()
      expect(wrapper.emitted('open-change')[0]).toEqual([['system']])
      const subUl = wrapper.find('.el-menu--inline, .ant-menu-sub')
      expect(subUl.element.style.display).not.toBe('none')
    })

    it('展开后点击子项：select 带完整 keyPath（根→叶子）', async () => {
      const wrapper = mount(UcMenu, { props: { items } })
      await findSubTitle(wrapper, '系统').trigger('click')
      await findLeaf(wrapper, '用户管理').trigger('click')
      expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['user'])
      expect(wrapper.emitted('select').at(-1)).toEqual(['user', ['system', 'user']])
    })

    it('defaultOpeneds：初始即展开子菜单', () => {
      const wrapper = mount(UcMenu, {
        props: { items, defaultOpeneds: ['system'] },
      })
      const subUl = wrapper.find('.el-menu--inline, .ant-menu-sub')
      expect(subUl.element.style.display).not.toBe('none')
    })

    it('horizontal 模式：根菜单带横向 class', () => {
      const wrapper = mount(UcMenu, { props: { items, mode: 'horizontal' } })
      expect(wrapper.html()).toMatch(/el-menu--horizontal|ant-menu-horizontal/)
    })
  })
}
