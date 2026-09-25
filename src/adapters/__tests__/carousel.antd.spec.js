import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcCarousel from '../antd/carousel'
import { carouselContract } from './carousel.contract'

carouselContract('ant-design-vue', UcCarousel)

describe('UcCarousel ant-design-vue 专属映射', () => {
  const items = [{ key: 'a' }, { key: 'b' }]

  it('渲染 ant-carousel 容器', async () => {
    const wrapper = mount(UcCarousel, {
      props: { items },
      slots: { a: '<p>A</p>', b: '<p>B</p>' },
    })
    await flushPromises()
    expect(wrapper.find('.ant-carousel').exists()).toBe(true)
  })

  it('水平方向 dotPosition=bottom', async () => {
    const wrapper = mount(UcCarousel, {
      props: { items, direction: 'horizontal' },
      slots: { a: '<p>A</p>', b: '<p>B</p>' },
    })
    await flushPromises()
    expect(wrapper.findComponent({ name: 'ACarousel' }).props('dotPosition')).toBe('bottom')
  })

  it('trigger 为 element 独有能力，antd 不透传该 prop', async () => {
    const wrapper = mount(UcCarousel, {
      props: { items, trigger: 'click' },
      slots: { a: '<p>A</p>', b: '<p>B</p>' },
    })
    await flushPromises()
    expect(wrapper.findComponent({ name: 'ACarousel' }).props('trigger')).toBeUndefined()
  })
})
