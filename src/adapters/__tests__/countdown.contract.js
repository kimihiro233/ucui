import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// UcCountdown 统一契约：value(目标时间戳)/format/title/prefix/suffix/valueStyle
// + @finish() @change(remainMs)
// element ElCountdown 用 rAF、antd AStatisticCountdown 用 setInterval(33ms)，
// 契约统一开假定时器避免真实计时；事件通过 $emit / 函数 props 触发
export function countdownContract(libName, UcCountdown) {
  const isElement = libName === 'element-plus'
  const innerName = isElement ? 'ElCountdown' : 'AStatisticCountdown'
  const boxSelector = isElement ? '.el-statistic' : '.ant-statistic'
  const numberSelector = isElement
    ? '.el-statistic__number'
    : '.ant-statistic-content'

  let wrapper

  const mountCountdown = (props = {}) => {
    const target = Date.now() + 10_000
    wrapper = mount(UcCountdown, {
      props: { value: target, title: '距结束', prefix: '剩', suffix: '后', ...props },
    })
    return { wrapper, target }
  }

  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    wrapper?.unmount()
    vi.useRealTimers()
  })

  describe(`UcCountdown 契约 [${libName}]`, () => {
    it('渲染 statistic 容器、标题与前缀后缀', () => {
      const { wrapper: w } = mountCountdown()
      expect(w.find(boxSelector).exists()).toBe(true)
      expect(w.text()).toContain('距结束')
      expect(w.find(numberSelector).exists()).toBe(true)
    })

    it('初始按 format 渲染剩余时间（10s = 00:00:10）', async () => {
      // element 在 onMounted 里才计算 rawValue 触发重渲染，需等一次 tick
      const { wrapper: w } = mountCountdown()
      await nextTick()
      expect(w.find(numberSelector).text()).toContain('00:00:10')
    })

    it('value/format/valueStyle 透传到底层组件', () => {
      const { wrapper: w, target } = mountCountdown({
        format: 'mm:ss',
        valueStyle: { color: 'red' },
      })
      const inner = w.findComponent({ name: innerName })
      expect(inner.props('value')).toBe(target)
      expect(inner.props('format')).toBe('mm:ss')
      expect(inner.props('valueStyle')).toEqual({ color: 'red' })
    })

    it('完成回调归一化为 finish', () => {
      const { wrapper: w } = mountCountdown()
      const inner = w.findComponent({ name: innerName })
      if (isElement) {
        inner.vm.$emit('finish')
      } else {
        inner.props('onFinish')()
      }
      expect(w.emitted('finish')).toBeTruthy()
    })

    it('变化回调归一化为 change(remainMs)', () => {
      const { wrapper: w } = mountCountdown()
      const inner = w.findComponent({ name: innerName })
      if (isElement) {
        inner.vm.$emit('change', 5000)
      } else {
        inner.props('onChange')(5000)
      }
      expect(w.emitted('change')[0]).toEqual([5000])
    })

    it('class 逃生舱落到外层', () => {
      const { wrapper: w } = mountCountdown({ class: 'my-countdown' })
      expect(w.html()).toContain('my-countdown')
    })
  })
}
