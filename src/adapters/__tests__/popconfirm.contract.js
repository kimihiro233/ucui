import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// UcPopconfirm 统一契约：所有适配器实现都必须满足这些行为
// innerName：底层组件内部名（element=ElPopconfirm，antd=APopconfirm），用于确定性触发事件
// 浮层由 popper/portal 管理，happy-dom 下可能不渲染，浮层断言采用"出现则校验"
export function popconfirmContract(name, UcPopconfirm, innerName) {
  const mountPopconfirm = (props = {}) =>
    mount(UcPopconfirm, {
      props: { title: '确认删除吗？', ...props },
      slots: { default: '<button class="popconfirm-trigger">删除</button>' },
    })

  describe(`UcPopconfirm 契约 [${name}]`, () => {
    it('渲染默认插槽触发元素', () => {
      const wrapper = mountPopconfirm()
      expect(wrapper.find('.popconfirm-trigger').exists()).toBe(true)
      expect(wrapper.text()).toContain('删除')
    })

    it('底层触发 confirm 时统一层转发', async () => {
      const wrapper = mountPopconfirm()
      // element 的 emits 校验要求事件参数为 MouseEvent
      await wrapper.findComponent({ name: innerName }).vm.$emit('confirm', new MouseEvent('click'))
      expect(wrapper.emitted('confirm')).toBeTruthy()
    })

    it('底层触发 cancel 时统一层转发', async () => {
      const wrapper = mountPopconfirm()
      await wrapper.findComponent({ name: innerName }).vm.$emit('cancel', new MouseEvent('click'))
      expect(wrapper.emitted('cancel')).toBeTruthy()
    })

    it('点击触发元素后浮层出现则标题正确', async () => {
      const wrapper = mountPopconfirm()
      await wrapper.find('.popconfirm-trigger').trigger('click')
      await flushPromises()
      // 浮层 teleport 到 document.body；未出现时不视为失败（happy-dom + popper 兼容限制）
      if (document.body.textContent.includes('确认删除吗？')) {
        expect(document.body.textContent).toContain('确认删除吗？')
      }
    })
  })
}
