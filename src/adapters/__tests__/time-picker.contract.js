import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// UcTimePicker 契约：v-model(格式化字符串)/format/clearable/disabled/placeholder/@change
export function timePickerContract(libName, UcTimePicker, options = {}) {
  const { innerName } = options

  describe(`UcTimePicker 契约 [${libName}]`, () => {
    it('基础渲染 input', () => {
      const wrapper = mount(UcTimePicker)
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('modelValue 渲染为格式化字符串', async () => {
      const wrapper = mount(UcTimePicker, { props: { modelValue: '12:30:00' } })
      await flushPromises()
      expect(wrapper.find('input').element.value).toBe('12:30:00')
    })

    it('placeholder 透传', () => {
      const wrapper = mount(UcTimePicker, { props: { placeholder: '请选择时间' } })
      expect(wrapper.find('input').attributes('placeholder')).toBe('请选择时间')
    })

    it('disabled 禁用输入框', () => {
      const wrapper = mount(UcTimePicker, { props: { disabled: true } })
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    it('v-model 归一化为字符串', async () => {
      const wrapper = mount(UcTimePicker)
      const inner = wrapper.findComponent({ name: innerName })
      expect(inner.exists()).toBe(true)
      inner.vm.$emit(libName === 'element' ? 'update:modelValue' : 'change', '08:00:00', '08:00:00')
      await flushPromises()
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted.at(-1)[0]).toBe('08:00:00')
    })

    it('change 事件归一化为字符串', async () => {
      const wrapper = mount(UcTimePicker)
      const inner = wrapper.findComponent({ name: innerName })
      inner.vm.$emit('change', '09:15:00', '09:15:00')
      await flushPromises()
      const emitted = wrapper.emitted('change')
      expect(emitted).toBeTruthy()
      expect(emitted.at(-1)[0]).toBe('09:15:00')
    })

    it('class 透传（逃生舱）', () => {
      // element 侧根节点是多根（含 teleport 注释），classes() 不可靠，用 html 断言
      const wrapper = mount(UcTimePicker, { attrs: { class: 'my-time-picker' } })
      expect(wrapper.html()).toContain('my-time-picker')
    })
  })
}
