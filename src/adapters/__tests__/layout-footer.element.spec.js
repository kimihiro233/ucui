import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcLayoutFooter from '../element/layout-footer'
import { layoutFooterContract } from './layout-footer.contract'

layoutFooterContract('element-plus', UcLayoutFooter)

describe('UcLayoutFooter element-plus 专属映射', () => {
  it('height 作为字符串传给 ElFooter（CSS 变量）', () => {
    const wrapper = mount(UcLayoutFooter, {
      props: { height: 72 },
      slots: { default: '底' },
    })
    expect(wrapper.findComponent({ name: 'ElFooter' }).props('height')).toBe('72px')
  })
})
