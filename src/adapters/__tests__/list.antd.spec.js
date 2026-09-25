import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcList from '../antd/list'
import { listContract } from './list.contract'

listContract('ant-design-vue', UcList)

describe('UcList ant-design-vue 专属映射（AList 原生）', () => {
  it('items 经 renderItem 数据驱动为 AListItem + AListItemMeta', () => {
    const w = mount(UcList, {
      props: {
        items: [
          { key: 'a', title: '标题A', description: '描述A' },
          { key: 'b', title: '标题B' },
        ],
      },
    })
    expect(w.findAllComponents({ name: 'AListItem' })).toHaveLength(2)
    expect(w.findAllComponents({ name: 'AListItemMeta' })).toHaveLength(2)
  })

  it('actions 渲染 ul.ant-list-item-action', () => {
    const w = mount(UcList, {
      props: { items: [{ key: 'a', title: 'T', actions: ['编辑', '删除'] }] },
    })
    expect(w.find('ul.ant-list-item-action').exists()).toBe(true)
    expect(w.findAll('ul.ant-list-item-action li')).toHaveLength(2)
  })

  it('size large → ant-list-lg 类', () => {
    const w = mount(UcList, { props: { items: [{ key: 'a', title: 'T' }], size: 'large' } })
    expect(w.find('.ant-list').classes()).toContain('ant-list-lg')
  })

  it('attrs 逃生舱透传（grid 等单边能力不纳入统一 API）', () => {
    const w = mount(UcList, { attrs: { class: 'my-list' }, props: { items: [] } })
    expect(w.find('.ant-list').classes()).toContain('my-list')
  })
})
