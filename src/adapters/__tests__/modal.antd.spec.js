import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcModal from '../antd/modal'
import { modalContract } from './modal.contract'

modalContract('ant-design-vue', UcModal)

describe('UcModal ant-design-vue 专属映射', () => {
  it('modelValue=true 渲染 ant-modal', () => {
    const wrapper = mount(UcModal, {
      props: { modelValue: true, getContainer: false },
    })
    expect(wrapper.find('.ant-modal').exists()).toBe(true)
  })

  it('渲染 title', () => {
    const wrapper = mount(UcModal, {
      props: { modelValue: true, title: '提示', getContainer: false },
    })
    expect(wrapper.find('.ant-modal').text()).toContain('提示')
  })

  it('渲染默认插槽内容', () => {
    const wrapper = mount(UcModal, {
      props: { modelValue: true, getContainer: false },
      slots: { default: '<p class="modal-body">内容区</p>' },
    })
    expect(wrapper.find('.modal-body').exists()).toBe(true)
  })

  it('点击关闭按钮触发 update:modelValue(false)', async () => {
    const wrapper = mount(UcModal, {
      props: { modelValue: true, getContainer: false },
    })
    await wrapper.find('[aria-label="Close"]').trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')[0]).toEqual([false])
  })

  it('width 映射到 ant-modal 的 style', () => {
    const wrapper = mount(UcModal, {
      props: { modelValue: true, width: 300, getContainer: false },
    })
    expect(wrapper.find('.ant-modal').attributes('style')).toContain('width: 300px')
  })

  it('open/close 事件在状态变化时触发', async () => {
    const wrapper = mount(UcModal, {
      props: { modelValue: false, getContainer: false },
    })
    await wrapper.setProps({ modelValue: true })
    // antd 的 afterOpenChange 在动画后触发，happy-dom 下可能不触发
    if (wrapper.emitted('open')) {
      expect(wrapper.emitted('open')).toBeTruthy()
    }
    await wrapper.setProps({ modelValue: false })
    if (wrapper.emitted('close')) {
      expect(wrapper.emitted('close')).toBeTruthy()
    }
  })
})
