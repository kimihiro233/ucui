import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcPageHeader from '../antd/page-header'
import { pageHeaderContract } from './page-header.contract'

pageHeaderContract('ant-design-vue', UcPageHeader)

describe('UcPageHeader ant-design-vue 专属映射', () => {
  it('content 映射为 subTitle', () => {
    const wrapper = mount(UcPageHeader, {
      props: { title: '标题', content: '副标题' },
    })
    const inner = wrapper.findComponent({ name: 'APageHeader' })
    expect(inner.props('title')).toBe('标题')
    expect(inner.props('subTitle')).toBe('副标题')
  })

  it('恒传 onBack 函数以保证返回按钮渲染', () => {
    const wrapper = mount(UcPageHeader, { props: { title: 'x' } })
    expect(typeof wrapper.findComponent({ name: 'APageHeader' }).props('onBack')).toBe(
      'function',
    )
  })

  it('ghost 直传 APageHeader', () => {
    const wrapper = mount(UcPageHeader, {
      props: { title: 'x', ghost: false },
    })
    expect(wrapper.findComponent({ name: 'APageHeader' }).props('ghost')).toBe(false)
  })

  it('ghost 默认 true 时根带 ant-page-header-ghost', () => {
    const wrapper = mount(UcPageHeader, { props: { title: 'x' } })
    expect(wrapper.find('.ant-page-header').classes()).toContain('ant-page-header-ghost')
  })
})
