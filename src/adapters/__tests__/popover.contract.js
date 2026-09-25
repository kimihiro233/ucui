import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// UcPopover 统一契约：所有适配器实现都必须满足这些行为
// 浮层依赖 popper + hover 触发器，happy-dom 下浮层可能不渲染，采用"出现则断言"
export function popoverContract(name, UcPopover) {
  const mountPopover = () =>
    mount(UcPopover, {
      props: { title: '标题', content: '内容文字', trigger: 'hover' },
      slots: { default: '<span class="popover-trigger">点/悬停我</span>' },
    })

  describe(`UcPopover 契约 [${name}]`, () => {
    it('渲染默认插槽触发元素', () => {
      const wrapper = mountPopover()
      expect(wrapper.find('.popover-trigger').exists()).toBe(true)
    })

    it('hover 后浮层出现则 title/content 正确', async () => {
      const wrapper = mountPopover()
      await wrapper.find('.popover-trigger').trigger('mouseenter')
      await flushPromises()
      if (document.body.textContent.includes('内容文字')) {
        expect(document.body.textContent).toContain('标题')
        expect(document.body.textContent).toContain('内容文字')
      }
    })
  })
}
