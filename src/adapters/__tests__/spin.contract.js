import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// UcSpin 统一契约：所有适配器实现都必须满足这些行为
// element 用 v-loading 遮罩，antd 用嵌套 loading 容器
export function spinContract(name, UcSpin) {
  const mountSpin = (props = {}, slots = {}) =>
    mount(UcSpin, {
      props,
      slots: { default: '<div class="spin-child">被包裹内容</div>', ...slots },
    })

  describe(`UcSpin 契约 [${name}]`, () => {
    it('渲染并包裹默认插槽内容', () => {
      const wrapper = mountSpin({ spinning: false })
      expect(wrapper.find('.spin-child').exists()).toBe(true)
    })

    it('spinning=true 时显示加载态', async () => {
      const wrapper = mountSpin({ spinning: true })
      await flushPromises()
      // element: .el-loading-mask；antd: .ant-spin-spinning
      expect(wrapper.find('.el-loading-mask, .ant-spin-spinning').exists()).toBe(true)
    })

    it('spinning=false 时不显示加载态', async () => {
      const wrapper = mountSpin({ spinning: false })
      await flushPromises()
      expect(wrapper.find('.el-loading-mask, .ant-spin-spinning').exists()).toBe(false)
    })

    it('tip 随加载态显示', async () => {
      const wrapper = mountSpin({ spinning: true, tip: '加载中...' })
      await flushPromises()
      expect(wrapper.html()).toContain('加载中')
    })
  })
}
