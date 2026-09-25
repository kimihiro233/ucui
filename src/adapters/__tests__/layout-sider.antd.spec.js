import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcLayoutSider from '../antd/layout-sider'
import { layoutSiderContract } from './layout-sider.contract'

layoutSiderContract('ant-design-vue', UcLayoutSider)

describe('UcLayoutSider ant-design-vue 专属映射', () => {
  it('width 以原始 number 传给 Sider', () => {
    const wrapper = mount(UcLayoutSider, {
      props: { width: 220 },
      slots: { default: '侧' },
    })
    expect(wrapper.findComponent({ name: 'ALayoutSider' }).props('width')).toBe(220)
  })

  it('折叠能力（collapsible/collapsed/collapsedWidth/breakpoint/theme）经 attrs 透传', () => {
    const wrapper = mount(UcLayoutSider, {
      props: {
        width: 200,
        collapsible: true,
        collapsed: true,
        collapsedWidth: 64,
        breakpoint: 'lg',
        theme: 'dark',
      },
      slots: { default: '侧' },
    })
    const sider = wrapper.findComponent({ name: 'ALayoutSider' })
    expect(sider.props('collapsible')).toBe(true)
    expect(sider.props('collapsed')).toBe(true)
    expect(sider.props('collapsedWidth')).toBe(64)
    expect(sider.props('breakpoint')).toBe('lg')
    expect(sider.props('theme')).toBe('dark')
  })

  it('onCollapse 函数 prop 经 attrs 透传', () => {
    const onCollapse = vi.fn()
    const wrapper = mount(UcLayoutSider, {
      props: { width: 200, collapsible: true },
      attrs: { onCollapse },
      slots: { default: '侧' },
    })
    expect(wrapper.findComponent({ name: 'ALayoutSider' }).props('onCollapse')).toBe(
      onCollapse,
    )
  })
})
