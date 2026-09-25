import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import UcTour from '../antd/tour'
import { tourContract } from './tour.contract'

tourContract('ant-design-vue', UcTour)

describe('UcTour ant-design-vue 专属映射', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })

  it('showClose 是 element 独有能力，不透传给 ATour', () => {
    const wrapper = mount(UcTour, {
      props: {
        modelValue: true,
        showClose: false,
        steps: [{ title: 't1', description: 'd1' }],
      },
    })
    expect(wrapper.findComponent({ name: 'ATour' }).props('showClose')).toBeUndefined()
  })

  it('showArrow 映射为 arrow', () => {
    const wrapper = mount(UcTour, {
      props: {
        modelValue: true,
        showArrow: false,
        steps: [{ title: 't1' }],
      },
    })
    expect(wrapper.findComponent({ name: 'ATour' }).props('arrow')).toBe(false)
  })
})
