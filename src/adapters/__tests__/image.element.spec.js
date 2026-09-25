import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcImage from '../element/image'
import { imageContract } from './image.contract'

const src = 'https://example.com/demo.png'

imageContract('element-plus', UcImage)

describe('UcImage element-plus 专属映射', () => {
  it('渲染 el-image 容器', async () => {
    const wrapper = mount(UcImage, { props: { src } })
    await flushPromises()
    expect(wrapper.find('.el-image').exists()).toBe(true)
  })

  it('preview=true 映射为 previewSrcList=[src] 且 teleported', async () => {
    const wrapper = mount(UcImage, { props: { src, preview: true } })
    await flushPromises()
    const inner = wrapper.findComponent({ name: 'ElImage' })
    expect(inner.props('previewSrcList')).toEqual([src])
    expect(inner.props('previewTeleported')).toBe(true)
  })

  it('preview=false 时 previewSrcList 为空数组', async () => {
    const wrapper = mount(UcImage, { props: { src } })
    await flushPromises()
    expect(wrapper.findComponent({ name: 'ElImage' }).props('previewSrcList')).toEqual([])
  })
})
