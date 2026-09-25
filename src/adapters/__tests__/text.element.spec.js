import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcText from '../element/text'
import { textContract } from './text.contract'

textContract('element-plus', UcText)

describe('UcText element-plus 专属映射', () => {
  it('size=large 映射 el-text--large 类', () => {
    const wrapper = mount(UcText, {
      props: { size: 'large' },
      slots: { default: () => 'big' },
    })
    expect(wrapper.find('.el-text').classes()).toContain('el-text--large')
  })

  it('size=small 映射 el-text--small 类', () => {
    const wrapper = mount(UcText, {
      props: { size: 'small' },
      slots: { default: () => 'small' },
    })
    expect(wrapper.find('.el-text').classes()).toContain('el-text--small')
  })

  it('tag 自定义渲染标签', () => {
    const wrapper = mount(UcText, {
      props: { tag: 'p' },
      slots: { default: () => 'paragraph' },
    })
    expect(wrapper.find('.el-text').element.tagName).toBe('P')
  })

  it('lineClamp 同时挂 is-line-clamp 类', () => {
    const wrapper = mount(UcText, {
      props: { lineClamp: 3 },
      slots: { default: () => 'lines' },
    })
    expect(wrapper.find('.el-text').classes()).toContain('is-line-clamp')
  })
})
