import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import UcBacktop from '../antd/backtop'
import { backtopContract } from './backtop.contract'

backtopContract('antd', UcBacktop)

describe('UcBacktop ant-design-vue 专属映射', () => {
  afterEach(() => {
    document.querySelector('#ant-scroll-area')?.remove()
  })

  it('visibilityHeight 统一默认 200（覆盖 antd 上游 400），target 默认返回 window', () => {
    const wrapper = mount(UcBacktop)
    const inner = wrapper.findComponent({ name: 'ABackTop' })
    expect(inner.props('visibilityHeight')).toBe(200)
    expect(inner.props('target')()).toBe(window)
    // antd 无 right/bottom prop，由适配器桥接为 style
    expect(inner.props('right')).toBeUndefined()
    expect(inner.props('bottom')).toBeUndefined()
  })

  it('target 字符串选择器转换为 getContainer 函数', () => {
    const area = document.createElement('div')
    area.id = 'ant-scroll-area'
    document.body.appendChild(area)
    const wrapper = mount(UcBacktop, {
      props: { target: '#ant-scroll-area', visibilityHeight: 10 },
    })
    const inner = wrapper.findComponent({ name: 'ABackTop' })
    expect(inner.props('target')()).toBe(area)
  })

  it('自定义 right/bottom 桥接到 FloatButton inline style', () => {
    const wrapper = mount(UcBacktop, {
      props: { right: 16, bottom: 32, visibilityHeight: 0 },
    })
    const style = wrapper.find('.ant-float-btn').attributes('style') || ''
    expect(style).toContain('right: 16px')
    expect(style).toContain('bottom: 32px')
  })
})
