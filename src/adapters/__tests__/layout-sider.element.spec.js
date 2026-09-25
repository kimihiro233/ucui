import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcLayoutSider from '../element/layout-sider'
import { layoutSiderContract } from './layout-sider.contract'

layoutSiderContract('element-plus', UcLayoutSider)

describe('UcLayoutSider element-plus 专属映射', () => {
  it('width 作为字符串传给 ElAside（CSS 变量）', () => {
    const wrapper = mount(UcLayoutSider, {
      props: { width: 220 },
      slots: { default: '侧' },
    })
    expect(wrapper.findComponent({ name: 'ElAside' }).props('width')).toBe('220px')
  })

  it('antd Sider 单边 props/事件不落到 aside DOM 上', () => {
    const wrapper = mount(UcLayoutSider, {
      props: {
        width: 200,
        collapsible: true,
        collapsed: false,
        breakpoint: 'lg',
        theme: 'dark',
        collapsedWidth: 64,
      },
      attrs: {
        onCollapse: () => {},
        onBreakpoint: () => {},
      },
      slots: { default: '侧' },
    })
    const aside = wrapper.find('.el-aside')
    expect(aside.attributes('collapsible')).toBeUndefined()
    expect(aside.attributes('breakpoint')).toBeUndefined()
    expect(aside.attributes('theme')).toBeUndefined()
    expect(aside.attributes('collapsed-width')).toBeUndefined()
  })
})
