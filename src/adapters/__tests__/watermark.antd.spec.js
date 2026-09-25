import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcWatermark from '../antd/watermark'
import { watermarkContract } from './watermark.contract'

watermarkContract('ant-design-vue', UcWatermark)

describe('UcWatermark ant-design-vue 专属', () => {
  it('容器 position:relative 且渲染 AWatermark', async () => {
    const wrapper = mount(UcWatermark, {
      props: { content: 'AD' },
      slots: { default: '<p>内容</p>' },
    })
    await flushPromises()
    expect(wrapper.findComponent({ name: 'AWatermark' }).exists()).toBe(true)
    expect(wrapper.element.style.position).toBe('relative')
  })
})
