import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcAlert 统一契约：所有适配器实现都必须满足这些行为
// 注：关闭按钮类名两端不同（el-alert__closebtn / ant-alert-close-icon），用 [class*="close"] 语义匹配
export function alertContract(name, UcAlert) {
  describe(`UcAlert 契约 [${name}]`, () => {
    it('渲染标题', () => {
      const wrapper = mount(UcAlert, { props: { title: '警告标题', type: 'warning' } })
      expect(wrapper.text()).toContain('警告标题')
    })

    it('渲染默认插槽内容', () => {
      const wrapper = mount(UcAlert, {
        props: { title: '标题' },
        slots: { default: '<p class="alert-body">详细说明</p>' },
      })
      expect(wrapper.text()).toContain('详细说明')
    })

    it('默认不渲染关闭按钮', () => {
      const wrapper = mount(UcAlert, { props: { title: 't' } })
      expect(wrapper.find('[class*="close"]').exists()).toBe(false)
    })

    it('closable 时渲染关闭按钮', () => {
      const wrapper = mount(UcAlert, { props: { title: 't', closable: true } })
      expect(wrapper.find('[class*="close"]').exists()).toBe(true)
    })

    it('点击关闭触发 close 事件', async () => {
      const wrapper = mount(UcAlert, { props: { title: 't', closable: true } })
      await wrapper.find('[class*="close"]').trigger('click')
      expect(wrapper.emitted('close')).toBeTruthy()
    })
  })
}
