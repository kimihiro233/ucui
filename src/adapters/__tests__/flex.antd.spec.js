import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcFlex from '../antd/flex'
import { flexContract } from './flex.contract'

flexContract('ant-design-vue', UcFlex)

describe('UcFlex ant-design-vue 专属映射（AFlex 原生）', () => {
  it('wrap 档位类 ant-flex-wrap-wrap', () => {
    const w = mount(UcFlex, { props: { wrap: 'wrap' }, slots: { default: 'x' } })
    expect(w.find('.ant-flex').classes()).toContain('ant-flex-wrap-wrap')
  })

  it('gap 档位类 ant-flex-gap-large', () => {
    const w = mount(UcFlex, { props: { gap: 'large' }, slots: { default: 'x' } })
    expect(w.find('.ant-flex').classes()).toContain('ant-flex-gap-large')
  })

  it('justify space-between 类', () => {
    const w = mount(UcFlex, { props: { justify: 'space-between' }, slots: { default: 'x' } })
    expect(w.find('.ant-flex').classes()).toContain('ant-flex-justify-space-between')
  })

  it('vertical 且未传 align 时默认 align-stretch 类', () => {
    const w = mount(UcFlex, { props: { vertical: true }, slots: { default: 'x' } })
    expect(w.find('.ant-flex').classes()).toContain('ant-flex-align-stretch')
  })

  it('gap 数字经内联 style 透出', () => {
    const w = mount(UcFlex, { props: { gap: 12 }, slots: { default: 'x' } })
    expect(w.find('.ant-flex').attributes('style') || '').toContain('gap: 12px')
  })
})
