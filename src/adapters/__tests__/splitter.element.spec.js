import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { h } from 'vue'
import UcSplitter from '../element/splitter'
import UcSplitterPanel from '../element/splitter-panel'
import { splitterContract } from './splitter.contract'

splitterContract('element-plus', UcSplitter, UcSplitterPanel)

describe('UcSplitter element-plus 专属映射', () => {
  it('layout/lazy 传给 ElSplitter', () => {
    const wrapper = mount(UcSplitter, {
      props: { layout: 'vertical', lazy: true },
      slots: {
        default: () => [
          h(UcSplitterPanel, null, { default: () => 'A' }),
          h(UcSplitterPanel, null, { default: () => 'B' }),
        ],
      },
    })
    const inner = wrapper.findComponent({ name: 'ElSplitter' })
    expect(inner.props('layout')).toBe('vertical')
    expect(inner.props('lazy')).toBe(true)
  })
})
