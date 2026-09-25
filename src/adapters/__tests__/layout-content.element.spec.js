import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcLayoutContent from '../element/layout-content'
import { layoutContentContract } from './layout-content.contract'

layoutContentContract('element-plus', UcLayoutContent)

describe('UcLayoutContent element-plus 专属映射', () => {
  it('渲染 ElMain', () => {
    const wrapper = mount(UcLayoutContent, { slots: { default: '正文' } })
    expect(wrapper.findComponent({ name: 'ElMain' }).exists()).toBe(true)
  })
})
