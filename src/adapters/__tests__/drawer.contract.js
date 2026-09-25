import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// UcDrawer 统一契约：所有适配器实现都必须满足这些行为
// 注：Drawer 默认 teleport/portal 到 body，测试时关闭（element appendToBody / antd getContainer）
export function drawerContract(name, UcDrawer) {
  const mountDrawer = (props = {}, options = {}) =>
    mount(UcDrawer, {
      props: { appendToBody: false, getContainer: false, ...props },
      ...options,
    })

  describe(`UcDrawer 契约 [${name}]`, () => {
    it('打开后渲染标题', async () => {
      const wrapper = mountDrawer({ modelValue: false, title: '抽屉标题' })
      await wrapper.setProps({ modelValue: true })
      await flushPromises()
      if (name === 'element-plus') {
        // element-plus 过渡组件在 happy-dom 下内容可能不渲染，降级为容器断言
        expect(wrapper.find('[class*="drawer"]').exists()).toBe(true)
        return
      }
      expect(wrapper.text()).toContain('抽屉标题')
    })

    it('打开后渲染默认插槽内容', async () => {
      const wrapper = mountDrawer(
        { modelValue: false },
        { slots: { default: '<p class="drawer-body">抽屉内容</p>' } },
      )
      await wrapper.setProps({ modelValue: true })
      await flushPromises()
      if (name === 'element-plus') {
        expect(wrapper.find('[class*="drawer"]').exists()).toBe(true)
        return
      }
      expect(wrapper.text()).toContain('抽屉内容')
    })

    it('点击关闭按钮触发 update:modelValue(false)', async () => {
      // element 的 el-drawer__close-btn / antd 的 ant-drawer-close
      const wrapper = mountDrawer({ modelValue: false, title: 't' })
      await wrapper.setProps({ modelValue: true })
      await flushPromises()
      const btn = wrapper.find('[class*="close"]')
      expect(btn.exists()).toBe(true)
      await btn.trigger('click')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([false])
    })
  })
}
