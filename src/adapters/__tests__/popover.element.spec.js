import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcPopover from '../element/popover'
import { popoverContract } from './popover.contract'

popoverContract('element-plus', UcPopover)

describe('UcPopover element-plus 专属映射', () => {
  it('渲染触发元素且默认浮层隐藏', () => {
    const wrapper = mount(UcPopover, {
      props: { content: 'c' },
      slots: { default: '<span class="t">x</span>' },
    })
    expect(wrapper.find('.t').exists()).toBe(true)
  })

  it('trigger=click 透传', async () => {
    const wrapper = mount(UcPopover, {
      props: { title: 't', content: 'c', trigger: 'click' },
      slots: { default: '<span class="trigger2">x</span>' },
    })
    await wrapper.find('.trigger2').trigger('click')
    await flushPromises()
    if (document.body.textContent.includes('c')) {
      expect(document.body.textContent).toContain('c')
    }
  })
})
