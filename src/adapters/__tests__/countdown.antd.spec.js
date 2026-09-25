import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCountdown from '../antd/countdown'
import { countdownContract } from './countdown.contract'

countdownContract('ant-design-vue', UcCountdown)

describe('UcCountdown ant-design-vue 专属映射', () => {
  let wrapper

  beforeEach(() => {
    vi.useFakeTimers()
  })
  afterEach(() => {
    wrapper?.unmount()
    vi.useRealTimers()
  })

  it('渲染 ant-statistic 与标题节点', () => {
    wrapper = mount(UcCountdown, {
      props: { value: Date.now() + 10000, title: '标题' },
    })
    expect(wrapper.find('.ant-statistic').exists()).toBe(true)
    expect(wrapper.find('.ant-statistic-title').text()).toBe('标题')
  })

  it('默认 format 为 HH:mm:ss 且 onFinish/onChange 是函数 props', () => {
    wrapper = mount(UcCountdown, { props: { value: Date.now() + 10000 } })
    const inner = wrapper.findComponent({ name: 'AStatisticCountdown' })
    expect(inner.props('format')).toBe('HH:mm:ss')
    expect(typeof inner.props('onFinish')).toBe('function')
    expect(typeof inner.props('onChange')).toBe('function')
  })
})
