import { describe, it, expect, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import UcScrollbar from '../antd/scrollbar'
import { scrollbarContract } from './scrollbar.contract'

scrollbarContract('ant-design-vue', UcScrollbar)

describe('UcScrollbar ant-design-vue 原生兜底', () => {
  afterEach(() => vi.restoreAllMocks())

  it('非 native 时包裹层带细滚动条类', () => {
    const wrapper = mount(UcScrollbar, { slots: { default: '<div>x</div>' } })
    expect(wrapper.find('.uc-scrollbar__wrap').classes()).toContain(
      'uc-scrollbar__wrap--hidden-default',
    )
  })

  it('always 时包裹层带常驻类（overflow: scroll）', () => {
    const wrapper = mount(UcScrollbar, {
      props: { always: true },
      slots: { default: '<div>x</div>' },
    })
    expect(wrapper.find('.uc-scrollbar__wrap').classes()).toContain(
      'uc-scrollbar__wrap--always',
    )
  })

  it('滚动到边界时按 distance 抛 end-reached（top/bottom）', async () => {
    const wrapper = mount(UcScrollbar, {
      props: { distance: 10 },
      slots: { default: '<div>x</div>' },
    })
    const wrap = wrapper.find('.uc-scrollbar__wrap').element
    vi.spyOn(wrap, 'scrollTop', 'get').mockReturnValue(0)
    vi.spyOn(wrap, 'scrollHeight', 'get').mockReturnValue(100)
    vi.spyOn(wrap, 'clientHeight', 'get').mockReturnValue(100)
    await wrapper.find('.uc-scrollbar__wrap').trigger('scroll')
    const dirs = wrapper.emitted('end-reached').map((args) => args[0])
    expect(dirs).toContain('top')
    expect(dirs).toContain('bottom')
  })

  it('wrapStyle/viewStyle 合并到对应元素', () => {
    const wrapper = mount(UcScrollbar, {
      props: { wrapStyle: 'background: rgb(255, 0, 0);', viewStyle: 'color: red;' },
      slots: { default: '<div>x</div>' },
    })
    expect(wrapper.find('.uc-scrollbar__wrap').attributes('style')).toContain(
      'background: rgb(255, 0, 0)',
    )
    expect(wrapper.find('.uc-scrollbar__view').attributes('style')).toContain('color: red')
  })

  it('setScrollTop/setScrollLeft 可安全调用，wrapRef 指向包裹元素', () => {
    const wrapper = mount(UcScrollbar, { slots: { default: '<div>x</div>' } })
    expect(() => {
      wrapper.vm.setScrollTop(50)
      wrapper.vm.setScrollLeft(30)
    }).not.toThrow()
    expect(wrapper.vm.wrapRef).toBe(wrapper.find('.uc-scrollbar__wrap').element)
  })
})
