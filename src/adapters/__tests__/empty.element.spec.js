import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcEmpty from '../element/empty'
import { emptyContract } from './empty.contract'

emptyContract('element-plus', UcEmpty)

describe('UcEmpty element-plus 专属映射', () => {
  it('渲染 el-empty', () => {
    const wrapper = mount(UcEmpty)
    expect(wrapper.find('.el-empty').exists()).toBe(true)
  })

  it('description 渲染在 el-empty__description', () => {
    const wrapper = mount(UcEmpty, { props: { description: '空' } })
    expect(wrapper.find('.el-empty__description').text()).toContain('空')
  })
})
