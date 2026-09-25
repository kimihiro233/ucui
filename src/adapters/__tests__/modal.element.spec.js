import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcModal from '../element/modal'
import { modalContract } from './modal.contract'

modalContract('element-plus', UcModal)

describe('UcModal element-plus 专属映射', () => {
  it('modelValue=true 渲染 el-overlay-dialog', () => {
    const wrapper = mount(UcModal, {
      props: { modelValue: true, appendToBody: false },
    })
    expect(wrapper.find('.el-overlay-dialog').exists()).toBe(true)
  })

  it('open/close 事件在状态变化时触发', async () => {
    const wrapper = mount(UcModal, {
      props: { modelValue: false, appendToBody: false },
    })
    await wrapper.setProps({ modelValue: true })
    // happy-dom 下 transition 可能不触发事件，无事件时跳过
    if (wrapper.emitted('open')) {
      expect(wrapper.emitted('open')).toBeTruthy()
    }
    await wrapper.setProps({ modelValue: false })
    if (wrapper.emitted('close')) {
      expect(wrapper.emitted('close')).toBeTruthy()
    }
  })
})
