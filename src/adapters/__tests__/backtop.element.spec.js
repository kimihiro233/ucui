import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import UcBacktop from '../element/backtop'
import { backtopContract } from './backtop.contract'

backtopContract('element-plus', UcBacktop)

describe('UcBacktop element-plus 专属映射', () => {
  afterEach(() => {
    document.querySelector('#el-scroll-area')?.remove()
  })

  it('默认值直传 ElBacktop（visibilityHeight 200 / right&bottom 40）', () => {
    const wrapper = mount(UcBacktop)
    const inner = wrapper.findComponent({ name: 'ElBacktop' })
    expect(inner.props('visibilityHeight')).toBe(200)
    expect(inner.props('right')).toBe(40)
    expect(inner.props('bottom')).toBe(40)
    expect(inner.props('target')).toBe('')
  })

  it('自定义 visibilityHeight/right/bottom/target 直传', () => {
    const area = document.createElement('div')
    area.id = 'el-scroll-area'
    document.body.appendChild(area)
    const wrapper = mount(UcBacktop, {
      props: { visibilityHeight: 50, right: 10, bottom: 20, target: '#el-scroll-area' },
    })
    const inner = wrapper.findComponent({ name: 'ElBacktop' })
    expect(inner.props('visibilityHeight')).toBe(50)
    expect(inner.props('right')).toBe(10)
    expect(inner.props('bottom')).toBe(20)
    expect(inner.props('target')).toBe('#el-scroll-area')
  })
})
