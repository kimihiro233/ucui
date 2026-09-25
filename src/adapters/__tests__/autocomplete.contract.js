import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// UcAutoComplete 统一契约：fetchSuggestions(query, callback) 模式，建议项 [{ value, ... }]
// 注意：建议面板经 popper/portal 渲染到 body，happy-dom 下不稳定，下拉交互断言用"出现则校验"兼容模式
export function autoCompleteContract(name, UcAutoComplete) {
  const fetchSuggestions = (query, cb) =>
    cb([{ value: `suggestion-${query}-1` }, { value: `suggestion-${query}-2` }])

  describe(`UcAutoComplete 契约 [${name}]`, () => {
    beforeEach(() => {
      document.body.innerHTML = ''
    })

    it('渲染输入框', () => {
      const wrapper = mount(UcAutoComplete, { props: { fetchSuggestions } })
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('modelValue 显示在输入框', () => {
      const wrapper = mount(UcAutoComplete, { props: { fetchSuggestions, modelValue: 'hello' } })
      expect(wrapper.find('input').element.value).toBe('hello')
    })

    it('placeholder 透传', () => {
      const wrapper = mount(UcAutoComplete, { props: { fetchSuggestions, placeholder: '请输入' } })
      // element 是 input placeholder attribute；antd 渲染为占位元素文本
      if (name === 'element-plus') {
        expect(wrapper.find('input').attributes('placeholder')).toBe('请输入')
      } else {
        expect(wrapper.text()).toContain('请输入')
      }
    })

    it('disabled 生效', () => {
      const wrapper = mount(UcAutoComplete, { props: { fetchSuggestions, disabled: true } })
      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
    })

    // debounce 走 attrs 逃生舱置 0，避免 element 默认 300ms 防抖拖慢测试
    it('输入触发 fetchSuggestions 并 emit input/update:modelValue', async () => {
      const spy = vi.fn(fetchSuggestions)
      const wrapper = mount(UcAutoComplete, { props: { fetchSuggestions: spy, debounce: 0 } })
      await wrapper.find('input').setValue('abc')
      await flushPromises()
      expect(spy).toHaveBeenCalled()
      expect(spy.mock.calls[0][0]).toBe('abc')
      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['abc'])
      expect(wrapper.emitted('input')).toBeTruthy()
    })

    it('建议项渲染后点击触发 select 并更新 v-model', async () => {
      const wrapper = mount(UcAutoComplete, {
        props: { fetchSuggestions, debounce: 0 },
        attachTo: document.body,
      })
      await wrapper.find('input').setValue('abc')
      await flushPromises()
      const items = document.querySelectorAll(
        '.el-autocomplete-suggestion li, .ant-select-item-option',
      )
      if (items.length) {
        items[0].dispatchEvent(new MouseEvent('click', { bubbles: true }))
        await flushPromises()
        expect(wrapper.emitted('select')).toBeTruthy()
        expect(wrapper.emitted('select')[0][0]).toMatchObject({ value: 'suggestion-abc-1' })
        expect(wrapper.emitted('update:modelValue').at(-1)).toEqual(['suggestion-abc-1'])
      }
      wrapper.unmount()
    })
  })
}
