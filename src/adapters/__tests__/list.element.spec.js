import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcList from '../element/list'
import { listContract } from './list.contract'

listContract('element-plus', UcList)

describe('UcList element-plus 专属映射（原生兜底）', () => {
  it('挂载后注入 uc-list-style 公共样式', () => {
    const w = mount(UcList, { props: { items: [{ key: 'a', title: 'T' }] } })
    expect(document.getElementById('uc-list-style')).toBeTruthy()
    w.unmount()
  })

  it('actions 渲染 ul.uc-list-item-action（分隔符 em）', () => {
    const w = mount(UcList, {
      props: { items: [{ key: 'a', title: 'T', actions: ['编辑', '删除', '更多'] }] },
    })
    expect(w.find('ul.uc-list-item-action').exists()).toBe(true)
    expect(w.findAll('ul.uc-list-item-action li')).toHaveLength(3)
    expect(w.find('em.uc-list-item-action-split').exists()).toBe(true)
  })

  it('loading 时不渲染 items，渲染加载占位', () => {
    const w = mount(UcList, { props: { items: [{ key: 'a', title: 'T' }], loading: true } })
    expect(w.find('ul.uc-list-items').exists()).toBe(false)
    expect(w.find('.uc-list-spinning').exists()).toBe(true)
  })

  it('item extra 渲染 .uc-list-item-extra 节点', () => {
    const w = mount(UcList, { props: { items: [{ key: 'a', title: 'T', extra: '额外' }] } })
    expect(w.find('.uc-list-item-extra').text()).toBe('额外')
  })

  it('escape class/style 透传根节点', () => {
    const w = mount(UcList, {
      attrs: { class: 'my-list', style: { margin: '8px' } },
      props: { items: [] },
    })
    expect(w.find('.uc-list').classes()).toContain('my-list')
    expect(w.find('.uc-list').attributes('style') || '').toContain('margin')
  })
})
