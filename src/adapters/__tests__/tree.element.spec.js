import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcTree from '../element/tree'
import { treeContract } from './tree.contract'

const data = [
  { key: 'a', label: '节点A', children: [{ key: 'a-1', label: '子节点A1' }] },
  { key: 'b', label: '节点B' },
]

treeContract('element-plus', UcTree)

describe('UcTree element-plus 专属映射', () => {
  it('渲染 el-tree 结构且 nodeKey=key', () => {
    const wrapper = mount(UcTree, { props: { data } })
    expect(wrapper.find('.el-tree').exists()).toBe(true)
    const inner = wrapper.findComponent({ name: 'ElTree' })
    expect(inner.props('nodeKey')).toBe('key')
    expect(inner.props('data')).toEqual(data)
  })
})
