import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcWatermark from '../element/watermark'
import { watermarkContract } from './watermark.contract'

watermarkContract('element-plus', UcWatermark)

describe('UcWatermark element-plus 专属', () => {
  it('容器 position:relative 且渲染 ElWatermark', async () => {
    const wrapper = mount(UcWatermark, {
      props: { content: 'EP' },
      slots: { default: '<p>内容</p>' },
    })
    await flushPromises()
    expect(wrapper.findComponent({ name: 'ElWatermark' }).exists()).toBe(true)
    expect(wrapper.element.style.position).toBe('relative')
  })
})
