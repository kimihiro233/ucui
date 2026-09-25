import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCard from '../antd/card'
import { cardContract } from './card.contract'

cardContract('ant-design-vue', UcCard)

describe('UcCard ant-design-vue 专属映射', () => {
  it('渲染 ant-card', () => {
    const wrapper = mount(UcCard)
    expect(wrapper.find('.ant-card').exists()).toBe(true)
  })

  it('默认 bordered 有边框类名', () => {
    const wrapper = mount(UcCard)
    expect(wrapper.find('.ant-card').classes()).toContain('ant-card-bordered')
  })

  it('bordered=false 无边框类名', () => {
    const wrapper = mount(UcCard, { props: { bordered: false } })
    expect(wrapper.find('.ant-card').classes()).not.toContain('ant-card-bordered')
  })

  it('hoverable 映射为类名', () => {
    const wrapper = mount(UcCard, { props: { hoverable: true } })
    expect(wrapper.find('.ant-card').classes()).toContain('ant-card-hoverable')
  })
})
