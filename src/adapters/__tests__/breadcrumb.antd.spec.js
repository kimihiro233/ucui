import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcBreadcrumb from '../antd/breadcrumb'
import { breadcrumbContract } from './breadcrumb.contract'

breadcrumbContract('ant-design-vue', UcBreadcrumb)

describe('UcBreadcrumb ant-design-vue 专属映射', () => {
  const items = [
    { label: '首页', to: 'https://example.com' },
    { label: '当前页' },
  ]

  it('渲染 ant-breadcrumb', () => {
    const wrapper = mount(UcBreadcrumb, { props: { items } })
    expect(wrapper.find('.ant-breadcrumb').exists()).toBe(true)
  })

  it('to 映射为 href', () => {
    const wrapper = mount(UcBreadcrumb, { props: { items } })
    const links = wrapper.findAll('.ant-breadcrumb-link a')
    expect(links[0].attributes('href')).toBe('https://example.com')
  })
})
