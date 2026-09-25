import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcImage from '../antd/image'
import { imageContract } from './image.contract'

const src = 'https://example.com/demo.png'

imageContract('ant-design-vue', UcImage)

describe('UcImage ant-design-vue 专属映射', () => {
  it('内部使用 AImage', async () => {
    const wrapper = mount(UcImage, { props: { src } })
    await flushPromises()
    expect(wrapper.findComponent({ name: 'AImage' }).exists()).toBe(true)
  })

  it('显式传 preview=false 覆盖 antd 默认 true', async () => {
    const wrapper = mount(UcImage, { props: { src } })
    await flushPromises()
    expect(wrapper.findComponent({ name: 'AImage' }).props('preview')).toBe(false)
  })

  it('preview=true 时 preview prop 为 true', async () => {
    const wrapper = mount(UcImage, { props: { src, preview: true } })
    await flushPromises()
    expect(wrapper.findComponent({ name: 'AImage' }).props('preview')).toBe(true)
  })
})
