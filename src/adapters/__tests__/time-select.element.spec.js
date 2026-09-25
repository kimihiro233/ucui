import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcTimeSelect from '../element/time-select'
import { timeSelectContract } from './time-select.contract'

timeSelectContract('element-plus', UcTimeSelect)

describe('UcTimeSelect element-plus 专属映射', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })
  afterEach(() => {
    document.querySelectorAll('#app').forEach((el) => el.remove())
  })

  it('渲染 el-select 结构并直传 props', () => {
    const wrapper = mount(UcTimeSelect, {
      props: {
        start: '08:00',
        end: '12:00',
        step: '01:00',
        minTime: '09:00',
        maxTime: '11:00',
        editable: false,
      },
    })
    expect(wrapper.find('.el-select').exists()).toBe(true)
    const inner = wrapper.findComponent({ name: 'ElTimeSelect' })
    expect(inner.props('start')).toBe('08:00')
    expect(inner.props('end')).toBe('12:00')
    expect(inner.props('step')).toBe('01:00')
    expect(inner.props('minTime')).toBe('09:00')
    expect(inner.props('maxTime')).toBe('11:00')
    expect(inner.props('editable')).toBe(false)
  })

  it('下拉按 start/end/step 生成选项（08:00-12:00 步长1h 共5项）', async () => {
    const wrapper = mount(UcTimeSelect, {
      props: { start: '08:00', end: '12:00', step: '01:00' },
      attachTo: document.body,
    })
    await wrapper.find('.el-select__wrapper').trigger('click')
    await flushPromises()
    const items = document.body.querySelectorAll('.el-select-dropdown__item')
    expect(items.length).toBe(5)
    expect(items[0].textContent.trim()).toBe('08:00')
    expect(items[4].textContent.trim()).toBe('12:00')
    wrapper.unmount()
  })

  it('minTime/maxTime 置灰语义对齐（<=min 或 >=max 的项 disabled）', async () => {
    const wrapper = mount(UcTimeSelect, {
      props: { start: '09:00', end: '12:00', step: '01:00', minTime: '10:00', maxTime: '11:00' },
      attachTo: document.body,
    })
    await wrapper.find('.el-select__wrapper').trigger('click')
    await flushPromises()
    const items = document.body.querySelectorAll('.el-select-dropdown__item')
    expect(items.length).toBe(4)
    // 09:00、10:00 被 minTime 置灰；11:00、12:00 被 maxTime 置灰
    const disabled = document.body.querySelectorAll('.el-select-dropdown__item.is-disabled')
    expect(disabled.length).toBe(4)
    wrapper.unmount()
  })

  it('点击选项触发 change 并更新 v-model', async () => {
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
    await wrapper.find('.el-select__wrapper').trigger('click')
    await flushPromises()
    const target = Array.from(document.body.querySelectorAll('.el-select-dropdown__item')).find(
      (el) => el.textContent.trim() === '09:30',
    )
    target.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    await flushPromises()
    expect(wrapper.emitted('change')).toBeTruthy()
    expect(wrapper.emitted('change')[0]).toEqual(['09:30'])
    expect(wrapper.emitted('update:modelValue')[0]).toEqual(['09:30'])
    wrapper.unmount()
  })
})
