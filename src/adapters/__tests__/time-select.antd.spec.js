import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcTimeSelect from '../antd/time-select'
import { buildTimeOptions } from '../antd/time-select'
import { timeSelectContract } from './time-select.contract'

timeSelectContract('ant-design-vue', UcTimeSelect)

describe('UcTimeSelect ant-design-vue 桥接实现', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })
  afterEach(() => {
    document.querySelectorAll('#app').forEach((el) => el.remove())
  })

  it('渲染 ant-select 结构并映射 props', () => {
    const wrapper = mount(UcTimeSelect, {
      props: { editable: false, clearable: false, size: 'small' },
    })
    expect(wrapper.find('.ant-select').exists()).toBe(true)
    const inner = wrapper.findComponent({ name: 'ASelect' })
    expect(inner.props('showSearch')).toBe(false)
    expect(inner.props('allowClear')).toBe(false)
    expect(inner.props('size')).toBe('small')
  })

  it('buildTimeOptions 生成与 element 一致的选项序列', () => {
    const options = buildTimeOptions('09:00', '10:00', '00:30', null, null)
    expect(options.map((o) => o.value)).toEqual(['09:00', '09:30', '10:00'])
    expect(options.every((o) => !o.disabled)).toBe(true)
  })

  it('buildTimeOptions minTime/maxTime 置灰语义（<=min 或 >=max，边界本身即 disabled）', () => {
    const options = buildTimeOptions('09:00', '12:00', '00:30', '10:00', '11:00')
    // 10:30 是唯一落在 (min, max) 开区间内的可选值
    expect(options.map((o) => o.disabled)).toEqual([true, true, true, false, true, true, true])
  })

  it('下拉渲染选项并点击触发 change', async () => {
    let wrapper
    wrapper = mount(UcTimeSelect, {
      props: {
        start: '09:00',
        end: '10:00',
        step: '00:30',
        'onUpdate:modelValue': (v) => wrapper.setProps({ modelValue: v }),
      },
      attachTo: document.body,
    })
    await wrapper.find('.ant-select-selector').trigger('mousedown')
    await flushPromises()
    const items = document.body.querySelectorAll('.ant-select-item-option')
    expect(items.length).toBe(3)
    const target = Array.from(items).find((el) => el.textContent.trim() === '09:30')
    target.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushPromises()
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')[0]).toEqual(['09:30'])
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['09:30'])
    wrapper.unmount()
  })
})
