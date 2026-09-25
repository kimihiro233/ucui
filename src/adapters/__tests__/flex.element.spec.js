import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcFlex from '../element/flex'
import { flexContract } from './flex.contract'

flexContract('element-plus', UcFlex)

describe('UcFlex element-plus 专属映射（原生兜底）', () => {
  it('默认渲染 display:flex + row 方向', () => {
    const w = mount(UcFlex, { slots: { default: 'x' } })
    const style = w.find('.uc-flex').attributes('style') || ''
    expect(style).toContain('display: flex')
    expect(style).toContain('flex-direction: row')
  })

  it('gap 档位 middle → 16px、large → 24px（对齐 antd 档位）', () => {
    const w1 = mount(UcFlex, { props: { gap: 'middle' }, slots: { default: 'x' } })
    expect(w1.find('.uc-flex').attributes('style') || '').toContain('gap: 16px')
    const w2 = mount(UcFlex, { props: { gap: 'large' }, slots: { default: 'x' } })
    expect(w2.find('.uc-flex').attributes('style') || '').toContain('gap: 24px')
  })

  it('wrap 换算成 flex-wrap（含 wrap-reverse）', () => {
    const w = mount(UcFlex, { props: { wrap: 'wrap-reverse' }, slots: { default: 'x' } })
    expect(w.find('.uc-flex').attributes('style') || '').toContain('flex-wrap: wrap-reverse')
  })

  it('flex 数字 → style flex（序列化为 flex-grow 长属性）', () => {
    const w = mount(UcFlex, { props: { flex: 2 }, slots: { default: 'x' } })
    expect((w.find('.uc-flex').attributes('style') || '').replace(/\s/g, '')).toContain('flex-grow:2')
  })

  it('style 逃生舱合并不覆盖基础样式', () => {
    const w = mount(UcFlex, { attrs: { style: { margin: '4px' } }, slots: { default: 'x' } })
    const style = w.find('.uc-flex').attributes('style') || ''
    expect(style).toContain('display: flex')
    expect(style).toContain('margin')
  })
})
