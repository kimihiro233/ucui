import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcLayoutHeader from '../element/layout-header'
import { layoutHeaderContract } from './layout-header.contract'

layoutHeaderContract('element-plus', UcLayoutHeader)

describe('UcLayoutHeader element-plus 专属映射', () => {
  it('height 作为字符串传给 ElHeader（CSS 变量）', () => {
    const wrapper = mount(UcLayoutHeader, {
      props: { height: 72 },
      slots: { default: '头' },
    })
    expect(wrapper.findComponent({ name: 'ElHeader' }).props('height')).toBe('72px')
  })
})
