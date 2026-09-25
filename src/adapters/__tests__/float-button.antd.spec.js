import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcFloatButton from '../antd/float-button'
import { floatButtonContract } from './float-button.contract'

floatButtonContract('ant-design-vue', UcFloatButton)

describe('UcFloatButton ant-design-vue 专属映射', () => {
  it('渲染 .ant-float-btn 结构并直传 props', () => {
    const wrapper = mount(UcFloatButton, {
      props: { type: 'primary', shape: 'square', tooltip: '快捷操作' },
    })
    expect(wrapper.find('.ant-float-btn').exists()).toBe(true)
    const inner = wrapper.findComponent({ name: 'AFloatButton' })
    expect(inner.props('type')).toBe('primary')
    expect(inner.props('shape')).toBe('square')
    expect(inner.props('tooltip')).toBe('快捷操作')
  })

  it('description 仅 square 形态透传（circle 规避 antd dev 告警）', () => {
    const circle = mount(UcFloatButton, {
      props: { shape: 'circle' },
      slots: { default: '新建' },
    })
    expect(circle.findComponent({ name: 'AFloatButton' }).props('description')).toBeUndefined()

    const square = mount(UcFloatButton, {
      props: { shape: 'square' },
      slots: { default: '新建' },
    })
    expect(square.findComponent({ name: 'AFloatButton' }).props('description')).toBeTruthy()
  })

  it('href/target 直传', () => {
    const wrapper = mount(UcFloatButton, {
      props: { href: 'https://example.com', target: '_blank' },
    })
    const inner = wrapper.findComponent({ name: 'AFloatButton' })
    expect(inner.props('href')).toBe('https://example.com')
    expect(inner.props('target')).toBe('_blank')
  })

  it('attrs 逃生舱：aria-label 落到根节点', () => {
    const wrapper = mount(UcFloatButton, { attrs: { 'aria-label': 'custom-fb' } })
    expect(wrapper.find('.ant-float-btn').attributes('aria-label')).toBe('custom-fb')
  })
})
