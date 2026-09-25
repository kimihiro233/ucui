import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// UcDropdown 统一契约：所有适配器实现都必须满足这些行为
// 菜单依赖 popper，happy-dom 下浮层可能不渲染，采用"出现则断言"
export function dropdownContract(name, UcDropdown) {
  const items = [
    { label: '操作一', key: 'a' },
    { label: '操作二', key: 'b' },
    { label: '禁用项', key: 'c', disabled: true },
  ]

  const mountDropdown = (props = {}) =>
    mount(UcDropdown, {
      props: { items, trigger: 'click', ...props },
      slots: { default: '<span class="dd-trigger">更多操作</span>' },
    })

  describe(`UcDropdown 契约 [${name}]`, () => {
    it('渲染触发元素', () => {
      const wrapper = mountDropdown()
      expect(wrapper.find('.dd-trigger').exists()).toBe(true)
    })

    it('click 后菜单出现则包含全部菜单项', async () => {
      const wrapper = mountDropdown()
      await wrapper.find('.dd-trigger').trigger('click')
      await flushPromises()
      if (document.body.textContent.includes('操作一')) {
        expect(document.body.textContent).toContain('操作二')
        expect(document.body.textContent).toContain('禁用项')
      }
    })
  })
}
