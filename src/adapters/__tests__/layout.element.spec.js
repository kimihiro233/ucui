import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import UcLayout from '../element/layout'
import UcLayoutHeader from '../element/layout-header'
import { layoutContract } from './layout.contract'

layoutContract('element-plus', UcLayout)

describe('UcLayout element-plus 专属映射', () => {
  it("direction='vertical' 显式传给 ElContainer（绕过失效的子组件名自动探测）", () => {
    const wrapper = mount(UcLayout, {
      props: { direction: 'vertical' },
      slots: { default: '<div>x</div>' },
    })
    expect(wrapper.findComponent({ name: 'ElContainer' }).props('direction')).toBe(
      'vertical',
    )
  })

  it('包装后的 UcLayoutHeader 子组件下仍稳定带 is-vertical 类', () => {
    // 直接子节点 name 是 UcLayoutHeader（非 ElHeader），ElContainer 的 vnode 探测本会失败；
    // 适配器显式传 direction 保证 is-vertical 类稳定存在
    const wrapper = mount(UcLayout, {
      props: { direction: 'vertical' },
      slots: {
        default: () => [h(UcLayoutHeader, null, { default: () => '头' }), h('div', '体')],
      },
    })
    expect(wrapper.find('.el-container').classes()).toContain('is-vertical')
  })
})
