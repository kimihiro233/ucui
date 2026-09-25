import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'

// UcTree 统一契约：data=[{ key, label, children?, disabled? }]
// 节点 label 选择器两端不同，用逗号并选（wrapper 内只会有一个库的实现）
const LABEL_SELECTOR = '.el-tree-node__label, .ant-tree-node-content-wrapper'
const CHECKBOX_SELECTOR = '.el-checkbox, .ant-tree-checkbox'

export function treeContract(name, UcTree) {
  const data = [
    { key: 'a', label: '节点A', children: [{ key: 'a-1', label: '子节点A1' }] },
    { key: 'b', label: '节点B', disabled: true },
  ]
  const flatData = [
    { key: 'a', label: '节点A' },
    { key: 'b', label: '节点B' },
  ]

  describe(`UcTree 契约 [${name}]`, () => {
    it('渲染树节点 label', () => {
      const wrapper = mount(UcTree, { props: { data: flatData } })
      expect(wrapper.text()).toContain('节点A')
      expect(wrapper.text()).toContain('节点B')
    })

    it('defaultExpandAll 展开子节点', async () => {
      const wrapper = mount(UcTree, { props: { data, defaultExpandAll: true } })
      await flushPromises()
      expect(wrapper.text()).toContain('子节点A1')
    })

    it('showCheckbox 渲染勾选框', () => {
      const wrapper = mount(UcTree, { props: { data: flatData, showCheckbox: true } })
      expect(wrapper.find(CHECKBOX_SELECTOR).exists()).toBe(true)
    })

    it('点击节点 label 触发 node-click(key)', async () => {
      const wrapper = mount(UcTree, { props: { data: flatData } })
      await wrapper.find(LABEL_SELECTOR).trigger('click')
      await nextTick()
      expect(wrapper.emitted('node-click')).toBeTruthy()
      expect(wrapper.emitted('node-click')[0][0]).toBe('a')
    })

    it('勾选复选框 emit update:checkedKeys 与 check', async () => {
      const wrapper = mount(UcTree, { props: { data: flatData, showCheckbox: true } })
      // element 是真实 input（setValue 触发 change）；antd 是 span.ant-tree-checkbox（click 触发）
      const input = wrapper.find('input[type="checkbox"]')
      if (input.exists()) {
        await input.setValue(true)
      } else {
        await wrapper.find('.ant-tree-checkbox').trigger('click')
      }
      await flushPromises()
      expect(wrapper.emitted('update:checkedKeys')).toBeTruthy()
      expect(wrapper.emitted('update:checkedKeys')[0][0]).toContain('a')
      expect(wrapper.emitted('check')).toBeTruthy()
    })

    it('受控 checkedKeys 初始勾选对应节点', async () => {
      const wrapper = mount(UcTree, {
        props: { data: flatData, showCheckbox: true, checkedKeys: ['a'] },
      })
      await flushPromises()
      expect(wrapper.html()).toMatch(/is-checked|ant-tree-checkbox-checked/)
    })

    it('disabled 节点标记生效', () => {
      const wrapper = mount(UcTree, { props: { data } })
      expect(wrapper.html()).toMatch(/disabled/)
    })
  })
}
