import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcTree from '../antd/tree'
import { treeContract } from './tree.contract'

const data = [
  { key: 'a', label: '节点A', children: [{ key: 'a-1', label: '子节点A1' }] },
  { key: 'b', label: '节点B' },
]

treeContract('ant-design-vue', UcTree)

describe('UcTree ant-design-vue 专属映射', () => {
  it('label 映射为 treeData 的 title', () => {
    const wrapper = mount(UcTree, { props: { data } })
    const inner = wrapper.findComponent({ name: 'ATree' })
    expect(inner.props('treeData')).toEqual([
      { key: 'a', title: '节点A', disabled: undefined, children: [{ key: 'a-1', title: '子节点A1', disabled: undefined, children: undefined }] },
      { key: 'b', title: '节点B', disabled: undefined, children: undefined },
    ])
  })

  it('checkable 由 showCheckbox 映射', () => {
    const wrapper = mount(UcTree, { props: { data, showCheckbox: true } })
    expect(wrapper.find('.ant-tree-checkbox').exists()).toBe(true)
  })
})
