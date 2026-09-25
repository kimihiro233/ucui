import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcBreadcrumb from '../element/breadcrumb'
import { breadcrumbContract } from './breadcrumb.contract'

breadcrumbContract('element-plus', UcBreadcrumb)

describe('UcBreadcrumb element-plus 专属映射', () => {
  const items = [
    { label: '首页', to: '/' },
    { label: '当前页' },
  ]

  it('渲染 el-breadcrumb', () => {
    const wrapper = mount(UcBreadcrumb, { props: { items } })
    expect(wrapper.find('.el-breadcrumb').exists()).toBe(true)
  })

  it('to 映射为 ElBreadcrumbItem 的 to', () => {
    const wrapper = mount(UcBreadcrumb, { props: { items } })
    const first = wrapper.findAll('.el-breadcrumb__item')[0]
    // element 有 to 时内部渲染为链接（a 或 router-link）
    expect(first.find('a, [role="link"]').exists()).toBe(true)
  })
})
