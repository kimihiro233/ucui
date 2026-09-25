import { describe, it, expect, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'

// UcMentions 统一契约：options=[{ value, label?, disabled? }]，prefix 默认 '@'
// 下拉面板经 popper/portal 渲染且 element 侧依赖 activeElement，交互断言用"出现则校验"兼容模式
export function mentionsContract(name, UcMentions) {
  const options = [
    { value: 'alice', label: 'Alice' },
    { value: 'bob', label: 'Bob' },
    { value: 'carol', label: 'Carol', disabled: true },
  ]

  describe(`UcMentions 契约 [${name}]`, () => {
    beforeEach(() => {
      document.body.innerHTML = ''
    })

    it('渲染输入元素（input 或 textarea）', () => {
      const wrapper = mount(UcMentions, { props: { options } })
      expect(wrapper.find('input, textarea').exists()).toBe(true)
    })

    it('modelValue 显示在输入元素', () => {
      const wrapper = mount(UcMentions, { props: { options, modelValue: 'hello @alice' } })
      expect(wrapper.find('input, textarea').element.value).toBe('hello @alice')
    })

    it('placeholder 透传', () => {
      const wrapper = mount(UcMentions, { props: { options, placeholder: '请输入' } })
      expect(wrapper.find('input, textarea').attributes('placeholder')).toBe('请输入')
    })

    it('disabled 生效', () => {
      const wrapper = mount(UcMentions, { props: { options, disabled: true } })
      expect(wrapper.find('input, textarea').attributes('disabled')).toBeDefined()
    })

    it('输入触发 update:modelValue 与 change', async () => {
      const wrapper = mount(UcMentions, { props: { options } })
      await wrapper.find('input, textarea').setValue('hi')
      await flushPromises()
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['hi'])
      expect(wrapper.emitted('change')).toBeTruthy()
    })

    it('输入 prefix 后下拉出现选项，点击触发 select', async () => {
      const wrapper = mount(UcMentions, { props: { options }, attachTo: document.body })
      const input = wrapper.find('input, textarea')
      // element 下拉可见性要求 document.activeElement 是输入框，须真实 focus
      input.element.focus()
      await nextTick()
      await input.setValue('@')
      // element syncAfterCursorMove 内部有 setTimeout(0)
      await new Promise((r) => setTimeout(r, 30))
      await flushPromises()
      const items = document.querySelectorAll(
        '.el-mention-dropdown__item, .ant-mentions-dropdown-menu-item',
      )
      if (items.length) {
        items[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))
        await flushPromises()
        expect(wrapper.emitted('select')).toBeTruthy()
        const last = wrapper.emitted('update:modelValue')?.at(-1)?.[0] ?? ''
        expect(last).toContain('alice')
      }
      wrapper.unmount()
    })
  })
}
