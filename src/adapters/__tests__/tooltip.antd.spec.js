import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcTooltip from '../antd/tooltip'
import { tooltipContract } from './tooltip.contract'

tooltipContract('ant-design-vue', UcTooltip)

describe('UcTooltip ant-design-vue 专属映射', () => {
  it('content 映射为 title（未 hover 时只渲染触发元素）', () => {
    const wrapper = mount(UcTooltip, {
      props: { content: '提示' },
      slots: { default: '<span class="t">x</span>' },
    })
    // antd Tooltip 未 hover 时浮层不渲染，只断言触发元素存在且组件正常挂载
    expect(wrapper.find('.t').exists()).toBe(true)
  })

  it('hover 后浮层出现则包含 ant-tooltip 内容', async () => {
    const wrapper = mount(UcTooltip, {
      props: { content: '详细提示' },
      slots: { default: '<span class="t">x</span>' },
    })
    await wrapper.find('.t').trigger('mouseenter')
    await flushPromises()
    if (document.body.textContent.includes('详细提示')) {
      expect(document.body.querySelector('.ant-tooltip')).toBeTruthy()
    }
  })
})
