import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcAnchor from '../element/anchor'
import { anchorContract } from './anchor.contract'

anchorContract('element-plus', UcAnchor)

describe('UcAnchor element-plus 专属映射', () => {
  const items = [
    { href: '#a', title: '章节A' },
    { href: '#b', title: '章节B' },
    {
      href: '#c',
      title: '章节C',
      children: [{ href: '#c1', title: '子节C1' }],
    },
  ]

  it('渲染 el-anchor 与 4 个 ElAnchorLink（含 sub-link 嵌套）', () => {
    const wrapper = mount(UcAnchor, { props: { items } })
    expect(wrapper.find('.el-anchor').exists()).toBe(true)
    const links = wrapper.findAllComponents({ name: 'ElAnchorLink' })
    expect(links.length).toBe(4)
    expect(links.map((l) => l.props('href'))).toEqual(['#a', '#b', '#c', '#c1'])
  })

  it('marker 等 element 独有能力经 attrs 逃生舱透传', () => {
    const wrapper = mount(UcAnchor, { props: { items, marker: false } })
    expect(wrapper.findComponent({ name: 'ElAnchor' }).props('marker')).toBe(false)
  })
})
