import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCard from '../element/card'
import { ElCard } from 'element-plus'
import { cardContract } from './card.contract'

cardContract('element-plus', UcCard)

describe('UcCard element-plus 专属映射', () => {
  it('渲染 el-card', () => {
    const wrapper = mount(UcCard)
    expect(wrapper.find('.el-card').exists()).toBe(true)
  })

  it('title 映射为 header prop', () => {
    const wrapper = mount(UcCard, { props: { title: '标题' } })
    expect(wrapper.find('.el-card__header').text()).toContain('标题')
  })

  it('hoverable 映射为 shadow=hover', () => {
    const wrapper = mount(UcCard, { props: { hoverable: true } })
    // shadow prop 被底层消费，不渲染为 DOM 属性，直接断言组件 props
    expect(wrapper.findComponent(ElCard).props('shadow')).toBe('hover')
  })

  it('正文渲染在 el-card__body', () => {
    const wrapper = mount(UcCard, {
      slots: { default: '<p class="x">正文</p>' },
    })
    expect(wrapper.find('.el-card__body .x').exists()).toBe(true)
  })
})
