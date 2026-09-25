import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcText from '../antd/text'
import { textContract } from './text.contract'

textContract('antd', UcText)

describe('UcText ant-design-vue 专属映射', () => {
  it('type/truncated 传到底层 TypographyBase', () => {
    const wrapper = mount(UcText, {
      props: { type: 'success', truncated: true },
      slots: { default: () => 'x' },
    })
    const inner = wrapper.findComponent({ name: 'TypographyBase' })
    expect(inner.props('type')).toBe('success')
    expect(inner.props('ellipsis')).toBe(true)
  })

  it('info 映射为 secondary', () => {
    const wrapper = mount(UcText, {
      props: { type: 'info' },
      slots: { default: () => 'x' },
    })
    expect(wrapper.findComponent({ name: 'TypographyBase' }).props('type')).toBe(
      'secondary',
    )
  })

  it('size/tag 为 element 单边能力，antd 不映射且标签恒为 span', () => {
    const wrapper = mount(UcText, {
      props: { size: 'large', tag: 'p' },
      slots: { default: () => 'x' },
    })
    const inner = wrapper.findComponent({ name: 'TypographyBase' })
    expect(inner.props('size')).toBeUndefined()
    expect(inner.props('tag')).toBeUndefined()
    expect(wrapper.find('p').exists()).toBe(false)
    expect(wrapper.find('.ant-typography').element.tagName).toBe('SPAN')
  })

  it('lineClamp 桥接为原生 CSS 盒模型样式', () => {
    const wrapper = mount(UcText, {
      props: { lineClamp: 2 },
      slots: { default: () => 'x' },
    })
    const style = wrapper.find('.ant-typography').attributes('style') || ''
    expect(style).toContain('overflow: hidden')
  })
})
