import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcDrawer from '../element/drawer'
import { drawerContract } from './drawer.contract'

drawerContract('element-plus', UcDrawer)

describe('UcDrawer element-plus 专属映射', () => {
  it('渲染 el-drawer 容器', async () => {
    const wrapper = mount(UcDrawer, {
      props: { modelValue: false, appendToBody: false },
    })
    await wrapper.setProps({ modelValue: true })
    await flushPromises()
    expect(wrapper.find('.el-drawer').exists()).toBe(true)
  })

  it('size 映射为宽度样式', async () => {
    const wrapper = mount(UcDrawer, {
      props: { modelValue: false, size: '400px', appendToBody: false },
    })
    await wrapper.setProps({ modelValue: true })
    await flushPromises()
    expect(wrapper.html()).toContain('400px')
  })

  it('关闭后隐藏', async () => {
    const wrapper = mount(UcDrawer, {
      props: { modelValue: false, appendToBody: false },
    })
    await wrapper.setProps({ modelValue: true })
    await flushPromises()
    await wrapper.setProps({ modelValue: false })
    await flushPromises()
    // element 关闭后 DOM 可能残留但不可见，或被移除
    const drawer = wrapper.find('.el-drawer')
    if (drawer.exists()) {
      const style = drawer.attributes('style') || ''
      const parentStyle = drawer.element.parentElement?.getAttribute('style') || ''
      const overlayStyle = wrapper.find('.el-overlay').attributes('style') || ''
      const combined = style + parentStyle + overlayStyle
      expect(combined.includes('display: none') || combined.includes('display:none')).toBe(true)
    }
  })
})
