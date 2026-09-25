import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcAnchor from '../antd/anchor'
import { anchorContract } from './anchor.contract'

anchorContract('ant-design-vue', UcAnchor)

describe('UcAnchor ant-design-vue 专属映射', () => {
  const items = [
    { href: '#a', title: '章节A' },
    {
      href: '#c',
      title: '章节C',
      children: [{ href: '#c1', title: '子节C1' }],
    },
  ]

  it('items 原样（补 key）传给 AAnchor，children 嵌套保留', () => {
    const wrapper = mount(UcAnchor, { props: { items } })
    const inner = wrapper.findComponent({ name: 'AAnchor' })
    const passed = inner.props('items')
    expect(passed[0].key).toBe('#a')
    expect(passed[0].href).toBe('#a')
    expect(passed[0].title).toBe('章节A')
    expect(passed[1].children[0].href).toBe('#c1')
    expect(passed[1].children[0].key).toBe('#c1')
  })

  it('显式 key 优先于 href 作为 items key', () => {
    const wrapper = mount(UcAnchor, {
      props: { items: [{ key: 'custom', href: '#x', title: 'X' }] },
    })
    expect(wrapper.findComponent({ name: 'AAnchor' }).props('items')[0].key).toBe(
      'custom',
    )
  })
})
