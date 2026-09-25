import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// UcCalendar 契约：v-model(格式化字符串)/format/@change
export function calendarContract(libName, UcCalendar, options = {}) {
  const { innerName } = options

  describe(`UcCalendar 契约 [${libName}]`, () => {
    it('基础渲染日历', async () => {
      const wrapper = mount(UcCalendar)
      await flushPromises()
      // 日历一定渲染 table
      expect(wrapper.find('table').exists()).toBe(true)
    })

    it('modelValue 字符串渲染对应选中日期', async () => {
      const wrapper = mount(UcCalendar, { props: { modelValue: '2026-09-15' } })
      await flushPromises()
      // 两端都渲染出日期数字 15
      expect(wrapper.text()).toContain('15')
    })

    it('v-model 归一化为格式化字符串', async () => {
      const wrapper = mount(UcCalendar)
      const inner = wrapper.findComponent({ name: innerName })
      expect(inner.exists()).toBe(true)
      if (libName === 'element') {
        inner.vm.$emit('update:modelValue', new Date(2026, 8, 15))
      } else {
        inner.vm.$emit('update:value', '2026-09-15')
      }
      await flushPromises()
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted.at(-1)[0]).toBe('2026-09-15')
    })

    it('change 事件归一化为格式化字符串', async () => {
      const wrapper = mount(UcCalendar)
      const inner = wrapper.findComponent({ name: innerName })
      if (libName === 'element') {
        inner.vm.$emit('change', new Date(2026, 8, 15))
      } else {
        inner.vm.$emit('change', '2026-09-15')
      }
      await flushPromises()
      const emitted = wrapper.emitted('change')
      expect(emitted).toBeTruthy()
      expect(emitted.at(-1)[0]).toBe('2026-09-15')
    })

    it('class 透传（逃生舱）', () => {
      const wrapper = mount(UcCalendar, { attrs: { class: 'my-calendar' } })
      expect(wrapper.html()).toContain('my-calendar')
    })
  })
}
