import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcPopconfirm from '../antd/popconfirm'
import { popconfirmContract } from './popconfirm.contract'

popconfirmContract('ant-design-vue', UcPopconfirm, 'APopconfirm')

describe('UcPopconfirm ant-design-vue 专属映射', () => {
  it('confirmText/cancelText 映射为 okText/cancelText', () => {
    const wrapper = mount(UcPopconfirm, {
      props: { title: '确定吗？', confirmText: '好的', cancelText: '算了' },
      slots: { default: '<button>点我</button>' },
    })
    const inner = wrapper.findComponent({ name: 'APopconfirm' })
    expect(inner.props('okText')).toBe('好的')
    expect(inner.props('cancelText')).toBe('算了')
  })

  it('title 直映到底层 title prop', () => {
    const wrapper = mount(UcPopconfirm, {
      props: { title: '确定吗？' },
      slots: { default: '<button>点我</button>' },
    })
    expect(wrapper.findComponent({ name: 'APopconfirm' }).props('title')).toBe('确定吗？')
  })
})
