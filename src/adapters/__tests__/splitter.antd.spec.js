import { describe, it, expect, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import UcSplitter from '../antd/splitter'
import UcSplitterPanel from '../antd/splitter-panel'
import { splitterContract } from './splitter.contract'

splitterContract('ant-design-vue', UcSplitter, UcSplitterPanel)

const rect = (w, hgt) => ({
  width: w,
  height: hgt,
  top: 0,
  left: 0,
  right: w,
  bottom: hgt,
  x: 0,
  y: 0,
  toJSON() {},
})

const mountSplitter = (props = {}, panelProps = [{}, {}]) =>
  mount(UcSplitter, {
    props,
    slots: {
      default: () =>
        panelProps.map((p, i) => h(UcSplitterPanel, p, { default: () => `P${i + 1}` })),
    },
  })

// 真实拖拽：先 mock 两个面板尺寸，再 dispatch mousedown/move/up
const drag = async (wrapper, axis, start, end, panelSizes) => {
  const panels = wrapper.findAll('.uc-splitter-panel')
  vi.spyOn(panels[0].element, 'getBoundingClientRect').mockReturnValue(
    axis === 'x' ? rect(panelSizes[0], 300) : rect(400, panelSizes[0]),
  )
  vi.spyOn(panels[1].element, 'getBoundingClientRect').mockReturnValue(
    axis === 'x' ? rect(panelSizes[1], 300) : rect(400, panelSizes[1]),
  )
  const eventInit = (v) =>
    axis === 'x' ? { clientX: v, clientY: 0 } : { clientX: 0, clientY: v }
  wrapper.find('.uc-splitter-bar__dragger').element.dispatchEvent(
    new MouseEvent('mousedown', { bubbles: true, ...eventInit(start) }),
  )
  window.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, ...eventInit(end) }))
  await nextTick()
  window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
  await nextTick()
}

describe('UcSplitter ant-design-vue 原生兜底', () => {
  afterEach(() => vi.restoreAllMocks())

  it('vertical 布局拖拽按 Y 轴改尺寸', async () => {
    const wrapper = mountSplitter({ layout: 'vertical' })
    await nextTick()
    await drag(wrapper, 'y', 100, 130, [200, 300])
    expect(wrapper.emitted('resize-end')[0]).toEqual([0, [230, 270]])
  })

  it('拖拽中出现遮罩与 is-active 拖拽条', async () => {
    const wrapper = mountSplitter()
    await nextTick()
    const panels = wrapper.findAll('.uc-splitter-panel')
    vi.spyOn(panels[0].element, 'getBoundingClientRect').mockReturnValue(rect(200, 300))
    vi.spyOn(panels[1].element, 'getBoundingClientRect').mockReturnValue(rect(200, 300))
    wrapper.find('.uc-splitter-bar__dragger').element.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: 100 }),
    )
    window.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 120 }))
    await nextTick()
    expect(wrapper.find('.uc-splitter__mask').exists()).toBe(true)
    expect(wrapper.find('.uc-splitter-bar__dragger').classes()).toContain('is-active')
    window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    await nextTick()
    expect(wrapper.find('.uc-splitter__mask').exists()).toBe(false)
  })

  it('lazy：拖拽中不发 resize、只移动幽灵指示条，松手后应用尺寸', async () => {
    const wrapper = mountSplitter({ lazy: true })
    await nextTick()
    const panels = wrapper.findAll('.uc-splitter-panel')
    vi.spyOn(panels[0].element, 'getBoundingClientRect').mockReturnValue(rect(200, 300))
    vi.spyOn(panels[1].element, 'getBoundingClientRect').mockReturnValue(rect(200, 300))
    wrapper.find('.uc-splitter-bar__dragger').element.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: 100 }),
    )
    window.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 180 }))
    await nextTick()
    expect(wrapper.emitted('resize')).toBeFalsy()
    const style = wrapper.find('.uc-splitter-bar__dragger').attributes('style') || ''
    expect(style).toContain('translateX(80px)')
    window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    await nextTick()
    expect(wrapper.emitted('resize-end')[0]).toEqual([0, [280, 120]])
  })

  it('受 min 约束：delta 过大时把空间还给另一侧', async () => {
    const wrapper = mountSplitter({}, [{}, { min: 100 }])
    await nextTick()
    await drag(wrapper, 'x', 100, 300, [200, 200])
    // na=400、nb=0 触发 minB=100 夹取 → na=300, nb=100
    expect(wrapper.emitted('resize-end')[0]).toEqual([0, [300, 100]])
  })

  it('折叠后再次点击恢复', async () => {
    const wrapper = mountSplitter({}, [
      { collapsible: true, size: '120px' },
      { collapsible: true, size: '200px' },
    ])
    await nextTick()
    const panels = wrapper.findAll('.uc-splitter-panel')
    vi.spyOn(panels[0].element, 'getBoundingClientRect').mockReturnValue(rect(120, 300))
    vi.spyOn(panels[1].element, 'getBoundingClientRect').mockReturnValue(rect(200, 300))
    const icons = wrapper.findAll('.uc-splitter-bar__collapse-icon')
    // end 折叠：第二面板 200 → 0，空间并入第一面板 120+200=320
    await icons[1].trigger('click')
    expect(wrapper.emitted('collapse')[0]).toEqual([0, 'end', [320, 0]])
    // 再次点击走恢复分支，从折叠内存取回 200
    await icons[1].trigger('click')
    const last = wrapper.emitted('collapse').at(-1)
    expect(last[1]).toBe('end')
    expect(last[2][1]).toBe(200)
  })

  it('resizable=false 时拖拽条 mousedown 不启动拖拽', async () => {
    const wrapper = mountSplitter({}, [{ resizable: false }, {}])
    await nextTick()
    wrapper.find('.uc-splitter-bar__dragger').element.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: 100 }),
    )
    window.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 200 }))
    expect(wrapper.emitted('resize-start')).toBeFalsy()
  })
})
