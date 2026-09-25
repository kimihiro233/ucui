import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcDivider from '../element/divider'
import { dividerContract } from './divider.contract'

dividerContract('element-plus', UcDivider)

describe('UcDivider element-plus 专属映射', () => {
  it('渲染 el-divider', () => {
    const wrapper = mount(UcDivider)
    expect(wrapper.find('.el-divider').exists()).toBe(true)
  })

  it('orientation 映射为 contentPosition', () => {
    const wrapper = mount(UcDivider, {
      props: { orientation: 'right' },
      slots: { default: 't' },
    })
    expect(wrapper.find('.el-divider__text').classes()).toContain('is-right')
  })
})
