import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcCarousel from '../element/carousel'
import { carouselContract } from './carousel.contract'

carouselContract('element-plus', UcCarousel)

describe('UcCarousel element-plus 专属映射', () => {
  // 注意：element 在恰好 2 帧 + loop 时会复制帧做占位，这里统一用 3 帧
  const items = [{ key: 'a' }, { key: 'b' }, { key: 'c' }]

  it('渲染 el-carousel 与三个 el-carousel-item', async () => {
    const wrapper = mount(UcCarousel, {
      props: { items },
      slots: { a: '<p>A</p>', b: '<p>B</p>', c: '<p>C</p>' },
    })
    await flushPromises()
    expect(wrapper.find('.el-carousel').exists()).toBe(true)
    expect(wrapper.findAll('.el-carousel__item').length).toBe(3)
  })

  it('height 与 trigger 直映 ElCarousel', async () => {
    const wrapper = mount(UcCarousel, {
      props: { items, height: '200px', trigger: 'click' },
      slots: { a: '<p>A</p>', b: '<p>B</p>', c: '<p>C</p>' },
    })
    await flushPromises()
    const inner = wrapper.findComponent({ name: 'ElCarousel' })
    expect(inner.props('height')).toBe('200px')
    expect(inner.props('trigger')).toBe('click')
  })

  it('ElCarouselItem 的 name 使用统一层 key', async () => {
    const wrapper = mount(UcCarousel, {
      props: { items },
      slots: { a: '<p>A</p>', b: '<p>B</p>', c: '<p>C</p>' },
    })
    await flushPromises()
    const panes = wrapper.findAllComponents({ name: 'ElCarouselItem' })
    expect(panes[0].props('name')).toBe('a')
    expect(panes[1].props('name')).toBe('b')
  })
})
