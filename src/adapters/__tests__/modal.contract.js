import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcModal 统一契约：所有适配器实现都必须满足这些行为
// 注意：Modal 默认会 teleport/portal 到 body，测试时关闭以保证 DOM 在 wrapper 内
export function modalContract(name, UcModal) {
  const mountModal = (props = {}, options = {}) =>
    mount(UcModal, {
      props: {
        appendToBody: false,
        getContainer: false,
        ...props,
      },
      ...options,
    })

  describe(`UcModal 契约 [${name}]`, () => {
    it('modelValue=true 时渲染弹窗', () => {
      const wrapper = mountModal({ modelValue: true })
      expect(wrapper.find('[role="dialog"]').exists()).toBe(true)
    })

    it('modelValue=false 时弹窗不存在或不可见', () => {
      const wrapper = mountModal({ modelValue: false })
      // element 关闭后 .el-overlay 会 display:none；antd 可能直接移除
      const hiddenEl = wrapper.find('[style*="display: none"], [style*="display:none"]')
      const dialog = wrapper.find('[role="dialog"]')
      if (!dialog.exists()) {
        expect(dialog.exists()).toBe(false)
        return
      }
      // 若存在，则元素本身或父级应 display:none
      const style = dialog.attributes('style') || ''
      const parentStyle = dialog.element.parentElement?.getAttribute('style') || ''
      const combined = style + parentStyle
      expect(combined.includes('display: none') || combined.includes('display:none') || hiddenEl.exists()).toBe(true)
    })
  })
}
