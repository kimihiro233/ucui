import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcDrawer from '../antd/drawer'
import { drawerContract } from './drawer.contract'

drawerContract('ant-design-vue', UcDrawer)

describe('UcDrawer ant-design-vue 专属映射', () => {
  it('渲染 ant-drawer 并显示标题', async () => {
    const wrapper = mount(UcDrawer, {
      props: { modelValue: false, title: '抽屉标题', getContainer: false },
    })
    await wrapper.setProps({ modelValue: true })
    await flushPromises()
    expect(wrapper.find('.ant-drawer').exists()).toBe(true)
    expect(wrapper.text()).toContain('抽屉标题')
  })

  it('size 映射为 width', async () => {
    const wrapper = mount(UcDrawer, {
      props: { modelValue: false, size: 400, getContainer: false },
    })
    await wrapper.setProps({ modelValue: true })
    await flushPromises()
    expect(wrapper.find('.ant-drawer-content-wrapper').attributes('style')).toContain('400px')
  })

  it('关闭后移除内容', async () => {
    const wrapper = mount(UcDrawer, {
      props: { modelValue: false, title: 't', getContainer: false },
    })
    await wrapper.setProps({ modelValue: true })
    await flushPromises()
    await wrapper.setProps({ modelValue: false })
    await flushPromises()
    // antd 关闭后 wrapper 保留但内容区隐藏/移除
    const drawer = wrapper.find('.ant-drawer-content-wrapper')
    if (drawer.exists()) {
      const style = drawer.attributes('style') || ''
      expect(
        style.includes('display: none') ||
          style.includes('display:none') ||
          style.includes('width: 0px') ||
          wrapper.find('.ant-drawer-open').exists() === false,
      ).toBe(true)
    }
  })
})
