import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcScrollbar from '../element/scrollbar'
import { scrollbarContract } from './scrollbar.contract'

scrollbarContract('element-plus', UcScrollbar)

describe('UcScrollbar element-plus 专属映射', () => {
  it('height/maxHeight 原值传给 ElScrollbar（addUnit 内部补 px）', () => {
    const wrapper = mount(UcScrollbar, {
      props: { height: 300, maxHeight: 500 },
      slots: { default: '<div>x</div>' },
    })
    const inner = wrapper.findComponent({ name: 'ElScrollbar' })
    expect(inner.props('height')).toBe(300)
    expect(inner.props('maxHeight')).toBe(500)
  })

  it('end-reached 透传', async () => {
    const wrapper = mount(UcScrollbar, { slots: { default: '<div>x</div>' } })
    wrapper.findComponent({ name: 'ElScrollbar' }).vm.$emit('end-reached', 'bottom')
    expect(wrapper.emitted('end-reached')[0]).toEqual(['bottom'])
  })

  it('distance/noresize 等 prop 透传', () => {
    const wrapper = mount(UcScrollbar, {
      props: { distance: 20, noresize: true },
      slots: { default: '<div>x</div>' },
    })
    const inner = wrapper.findComponent({ name: 'ElScrollbar' })
    expect(inner.props('distance')).toBe(20)
    expect(inner.props('noresize')).toBe(true)
  })
})
