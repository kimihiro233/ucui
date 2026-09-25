import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// UcTimeSelect 统一契约：v-model('HH:mm' 字符串) / start / end / step / minTime / maxTime
// element 侧包 ElTimeSelect（内部 ElSelect）；antd 侧为 ASelect 桥接（选项数据驱动）
// 下拉面板经 popper/portal 渲染，契约只覆盖宿主内行为，选项生成交互由各端 spec 保证
export function timeSelectContract(libName, UcTimeSelect) {
  const isElement = libName === 'element-plus'
  const innerName = isElement ? 'ElTimeSelect' : 'ASelect'

  describe(`UcTimeSelect 契约 [${libName}]`, () => {
    it('渲染选择器与 placeholder', () => {
      const wrapper = mount(UcTimeSelect, { props: { placeholder: '请选择时间' } })
      // element 2.14 新版 Select 的 placeholder 是占位 span 文本，antd 同为占位元素文本
      expect(wrapper.text()).toContain('请选择时间')
    })

    it('modelValue 显示当前值', async () => {
      const wrapper = mount(UcTimeSelect, { props: { modelValue: '09:30' } })
      await flushPromises()
      expect(wrapper.text()).toContain('09:30')
    })

    it('disabled 生效', () => {
      const wrapper = mount(UcTimeSelect, { props: { disabled: true } })
      expect(wrapper.html()).toMatch(/disabled|is-disabled/)
    })

    it('change 事件归一化转发', () => {
      const wrapper = mount(UcTimeSelect)
      wrapper.findComponent({ name: innerName }).vm.$emit('change', '09:30')
      expect(wrapper.emitted('change')[0]).toEqual(['09:30'])
    })

    it('clearable 映射（element 直传 / antd allowClear）', () => {
      const wrapper = mount(UcTimeSelect, { props: { clearable: false } })
      const inner = wrapper.findComponent({ name: innerName })
      if (isElement) {
        expect(inner.props('clearable')).toBe(false)
      } else {
        expect(inner.props('allowClear')).toBe(false)
      }
    })

    it('class 逃生舱落到外层', () => {
      const wrapper = mount(UcTimeSelect, { props: { class: 'my-time-select' } })
      expect(wrapper.html()).toContain('my-time-select')
    })
  })
}
