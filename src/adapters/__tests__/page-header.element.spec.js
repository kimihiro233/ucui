import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcPageHeader from '../element/page-header'
import { pageHeaderContract } from './page-header.contract'

pageHeaderContract('element-plus', UcPageHeader)

describe('UcPageHeader element-plus 专属映射', () => {
  it('title/content 原值传给 ElPageHeader', () => {
    const wrapper = mount(UcPageHeader, {
      props: { title: '标题', content: '副标题' },
    })
    const inner = wrapper.findComponent({ name: 'ElPageHeader' })
    expect(inner.props('title')).toBe('标题')
    expect(inner.props('content')).toBe('副标题')
  })

  it('back 事件桥接', async () => {
    const wrapper = mount(UcPageHeader, { props: { title: 'x' } })
    wrapper.findComponent({ name: 'ElPageHeader' }).vm.$emit('back')
    expect(wrapper.emitted('back')[0]).toEqual([])
  })

  it('ghost 不透传（element 页头无底色概念）', () => {
    const wrapper = mount(UcPageHeader, {
      props: { title: 'x', ghost: false },
    })
    expect(wrapper.findComponent({ name: 'ElPageHeader' }).props('ghost')).toBeUndefined()
  })

  it('contentful 修饰类：有默认插槽时根带 is-contentful', () => {
    const wrapper = mount(UcPageHeader, {
      props: { title: 'x' },
      slots: { default: '<div>主体</div>' },
    })
    expect(wrapper.find('.el-page-header').classes()).toContain('is-contentful')
  })
})
