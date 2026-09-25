import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcPopconfirm from '../element/popconfirm'
import { popconfirmContract } from './popconfirm.contract'

popconfirmContract('element-plus', UcPopconfirm, 'ElPopconfirm')

describe('UcPopconfirm element-plus 专属映射', () => {
  it('confirmText/cancelText 映射为 confirmButtonText/cancelButtonText', () => {
    const wrapper = mount(UcPopconfirm, {
      props: { title: '确定吗？', confirmText: '好的', cancelText: '算了' },
      slots: { default: '<button>点我</button>' },
    })
    const inner = wrapper.findComponent({ name: 'ElPopconfirm' })
    expect(inner.props('confirmButtonText')).toBe('好的')
    expect(inner.props('cancelButtonText')).toBe('算了')
  })

  it('触发元素走 reference 插槽', () => {
    const wrapper = mount(UcPopconfirm, {
      props: { title: '确定吗？' },
      slots: { default: '<button class="ref-trigger">点我</button>' },
    })
    expect(wrapper.find('.ref-trigger').exists()).toBe(true)
  })
})
