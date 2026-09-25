import { describe, it, expect, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, nextTick } from 'vue'
import UcSplitter from '../antd/splitter'
import UcSplitterPanel from '../antd/splitter-panel'
import { splitterPanelContract } from './splitter-panel.contract'

splitterPanelContract('ant-design-vue', UcSplitter, UcSplitterPanel)

describe('UcSplitterPanel ant-design-vue 原生兜底', () => {
  afterEach(() => vi.restoreAllMocks())

  it('真实拖拽后抛 update:size（px）', async () => {
    const wrapper = mount(UcSplitter, {
      slots: {
        default: () => [
          h(UcSplitterPanel, null, { default: () => 'A' }),
          h(UcSplitterPanel, null, { default: () => 'B' }),
        ],
      },
    })
    await nextTick()
    const panels = wrapper.findAll('.uc-splitter-panel')
    const rect = {
      width: 200,
      height: 300,
      top: 0,
      left: 0,
      right: 200,
      bottom: 300,
      x: 0,
      y: 0,
      toJSON() {},
    }
    vi.spyOn(panels[0].element, 'getBoundingClientRect').mockReturnValue(rect)
    vi.spyOn(panels[1].element, 'getBoundingClientRect').mockReturnValue(rect)
    wrapper.find('.uc-splitter-bar__dragger').element.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, clientX: 100 }),
    )
    window.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 140 }))
    window.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }))
    await nextTick()

    const panelWrappers = wrapper.findAllComponents(UcSplitterPanel)
    expect(panelWrappers[0].emitted('update:size')).toBeTruthy()
    expect(panelWrappers[0].emitted('update:size').at(-1)).toEqual([240])
    expect(panelWrappers[1].emitted('update:size').at(-1)).toEqual([160])
  })

  it('百分比/px 初始尺寸生成对应 flex-basis', () => {
    const wrapper = mount(UcSplitter, {
      slots: {
        default: () => [
          h(UcSplitterPanel, { size: '30%' }, { default: () => 'A' }),
          h(UcSplitterPanel, { size: '120px' }, { default: () => 'B' }),
        ],
      },
    })
    const panels = wrapper.findAll('.uc-splitter-panel')
    expect(panels[0].attributes('style')).toContain('flex-basis: 30%')
    expect(panels[1].attributes('style')).toContain('flex-basis: 120px')
  })
})
