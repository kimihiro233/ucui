import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcCheckTag 统一契约
// v-model:checked + disabled + type(配色，element 单边)；emits: change(boolean)
export function checkTagContract(libName, UcCheckTag) {
  const isElement = libName === 'element-plus'
  const rootSel = isElement ? '.el-check-tag' : '.ant-tag-checkable'
  const checkedClass = isElement ? 'is-checked' : 'ant-tag-checkable-checked'

  describe(`UcCheckTag 契约 [${libName}]`, () => {
    it('渲染标签根节点与文本', () => {
      const wrapper = mount(UcCheckTag, { slots: { default: () => '待选标签' } })
      const root = wrapper.find(rootSel)
      expect(root.exists()).toBe(true)
      expect(root.element.tagName).toBe('SPAN')
      expect(root.text()).toBe('待选标签')
    })

    it('checked=false 默认不挂选中类', () => {
      const wrapper = mount(UcCheckTag, { slots: { default: () => 'A' } })
      expect(wrapper.find(rootSel).classes()).not.toContain(checkedClass)
    })

    it('checked=true 挂选中类', () => {
      const wrapper = mount(UcCheckTag, {
        props: { checked: true },
        slots: { default: () => 'A' },
      })
      expect(wrapper.find(rootSel).classes()).toContain(checkedClass)
    })

    it('点击切换为选中并抛出 change/update:checked(true)', async () => {
      const wrapper = mount(UcCheckTag, { slots: { default: () => 'A' } })
      await wrapper.find(rootSel).trigger('click')
      expect(wrapper.emitted('change')[0]).toEqual([true])
      expect(wrapper.emitted('update:checked')[0]).toEqual([true])
    })

    it('选中态再点击切换回 false', async () => {
      const wrapper = mount(UcCheckTag, {
        props: { checked: true },
        slots: { default: () => 'A' },
      })
      await wrapper.find(rootSel).trigger('click')
      expect(wrapper.emitted('change')[0]).toEqual([false])
      expect(wrapper.emitted('update:checked')[0]).toEqual([false])
    })

    it('disabled 时点击不抛事件', async () => {
      const wrapper = mount(UcCheckTag, {
        props: { disabled: true },
        slots: { default: () => 'A' },
      })
      await wrapper.find(rootSel).trigger('click')
      expect(wrapper.emitted('change')).toBeUndefined()
      expect(wrapper.emitted('update:checked')).toBeUndefined()
    })

    it('class 逃生舱透传', () => {
      const wrapper = mount(UcCheckTag, {
        attrs: { class: 'my-check-tag' },
        slots: { default: () => 'A' },
      })
      expect(wrapper.find(rootSel).classes()).toContain('my-check-tag')
    })
  })
}
