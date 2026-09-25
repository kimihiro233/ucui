import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcStatistic from '../element/statistic'
import { statisticContract } from './statistic.contract'

statisticContract('element-plus', UcStatistic)

describe('UcStatistic element-plus 专属映射', () => {
  it('props 直映 ElStatistic', () => {
    const wrapper = mount(UcStatistic, {
      props: { title: '销量', value: 1234, precision: 1, prefix: '¥', suffix: '件' },
    })
    const inner = wrapper.findComponent({ name: 'ElStatistic' })
    expect(inner.props('title')).toBe('销量')
    expect(inner.props('value')).toBe(1234)
    expect(inner.props('precision')).toBe(1)
    expect(inner.props('prefix')).toBe('¥')
    expect(inner.props('suffix')).toBe('件')
  })

  it('title 渲染在 .el-statistic__head', () => {
    const wrapper = mount(UcStatistic, { props: { title: '销量', value: 1 } })
    expect(wrapper.find('.el-statistic__head').text()).toContain('销量')
  })
})
