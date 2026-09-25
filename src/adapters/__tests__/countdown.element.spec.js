import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCountdown from '../element/countdown'
import { countdownContract } from './countdown.contract'

countdownContract('element-plus', UcCountdown)

describe('UcCountdown element-plus 专属映射', () => {
  let wrapper

  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    wrapper?.unmount()
    vi.useRealTimers()
  })

  it('渲染 el-statistic 与标题节点', () => {
    wrapper = mount(UcCountdown, {
      props: { value: Date.now() + 10000, title: '标题' },
    })
    expect(wrapper.find('.el-statistic').exists()).toBe(true)
    expect(wrapper.find('.el-statistic__head').text()).toBe('标题')
  })

  it('默认 format 为 HH:mm:ss 并直映 ElCountdown', () => {
    wrapper = mount(UcCountdown, { props: { value: Date.now() + 10000 } })
    expect(wrapper.findComponent({ name: 'ElCountdown' }).props('format')).toBe(
      'HH:mm:ss',
    )
  })
})
