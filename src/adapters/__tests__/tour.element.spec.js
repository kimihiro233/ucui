import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcTour from '../element/tour'
import { tourContract } from './tour.contract'

tourContract('element-plus', UcTour)

describe('UcTour element-plus 专属映射', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('showClose 直映 ElTour', () => {
    const wrapper = mount(UcTour, {
      props: {
        modelValue: true,
        showClose: false,
        steps: [{ title: 't1', description: 'd1' }],
      },
    })
    expect(wrapper.findComponent({ name: 'ElTour' }).props('showClose')).toBe(false)
  })

  it('无 target 的步骤在 ElTourStep 上 target 为 undefined（居中模式）', async () => {
    const wrapper = mount(UcTour, {
      props: { modelValue: true, steps: [{ title: 't1' }] },
    })
    await flushPromises()
    expect(wrapper.findComponent({ name: 'ElTourStep' }).props('target')).toBeUndefined()
  })
})
