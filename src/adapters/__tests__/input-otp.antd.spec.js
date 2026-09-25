import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import UcInputOtp from '../antd/input-otp'
import { inputOtpContract } from './input-otp.contract'

inputOtpContract('ant-design-vue', UcInputOtp)

describe('UcInputOtp ant-design-vue 兜底实现', () => {
  it('渲染 uc-input-otp 结构与格子', () => {
    const wrapper = mount(UcInputOtp, { props: { modelValue: '' } })
    expect(wrapper.find('.uc-input-otp').exists()).toBe(true)
    expect(wrapper.findAll('.uc-input-otp__input-field').length).toBe(6)
    expect(wrapper.findAll('.uc-input-otp__input').length).toBe(6)
  })

  it('disabled 根节点带 uc-input-otp--disabled 类', () => {
    const wrapper = mount(UcInputOtp, { props: { disabled: true } })
    expect(wrapper.find('.uc-input-otp').classes()).toContain('uc-input-otp--disabled')
  })

  it('粘贴多字符自动分发到各格并触发 finish', async () => {
    const wrapper = mount(UcInputOtp, { props: { length: 4, modelValue: '' } })
    await wrapper.findAll('.uc-input-otp__input')[0].setValue('1234')
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['1234'])
    expect(wrapper.emitted('finish')).toBeTruthy()
    expect(wrapper.emitted('finish')[0]).toEqual(['1234'])
  })

  it('退格清除当前格并回退焦点', async () => {
    const wrapper = mount(UcInputOtp, { props: { modelValue: '123456' }, attachTo: document.body })
    const inputs = wrapper.findAll('.uc-input-otp__input')
    await inputs[2].trigger('keydown', { key: 'Backspace', code: 'Backspace' })
    expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['12456'])
    expect(document.activeElement).toBe(inputs[1].element)
    wrapper.unmount()
  })

  it('expose focus/blur 命令式方法', async () => {
    const wrapper = mount(UcInputOtp, { props: { modelValue: '' }, attachTo: document.body })
    expect(typeof wrapper.vm.focus).toBe('function')
    wrapper.vm.focus()
    await nextTick()
    expect(document.activeElement).toBe(wrapper.findAll('.uc-input-otp__input')[0].element)
    expect(() => wrapper.vm.blur()).not.toThrow()
    wrapper.unmount()
  })
})
