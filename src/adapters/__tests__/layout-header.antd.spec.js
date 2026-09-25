import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcLayoutHeader from '../antd/layout-header'
import { layoutHeaderContract } from './layout-header.contract'

layoutHeaderContract('ant-design-vue', UcLayoutHeader)

describe('UcLayoutHeader ant-design-vue 专属映射', () => {
  it('height 映射为 inline style.height', () => {
    const wrapper = mount(UcLayoutHeader, {
      props: { height: 72 },
      slots: { default: '头' },
    })
    const style = wrapper.find('.ant-layout-header').attributes('style') || ''
    expect(style).toContain('height: 72px')
  })

  it('用户 style 与 height 合并共存', () => {
    const wrapper = mount(UcLayoutHeader, {
      props: { height: 64 },
      attrs: { style: 'background: red;' },
      slots: { default: '头' },
    })
    const style = wrapper.find('.ant-layout-header').attributes('style') || ''
    expect(style).toContain('height: 64px')
    expect(style).toContain('background: red')
  })
})
