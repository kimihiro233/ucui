import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcEmpty from '../antd/empty'
import { emptyContract } from './empty.contract'

emptyContract('ant-design-vue', UcEmpty)

describe('UcEmpty ant-design-vue 专属映射', () => {
  it('渲染 ant-empty', () => {
    const wrapper = mount(UcEmpty)
    expect(wrapper.find('.ant-empty').exists()).toBe(true)
  })

  it('description 渲染在 ant-empty-description', () => {
    const wrapper = mount(UcEmpty, { props: { description: '空' } })
    expect(wrapper.find('.ant-empty-description').text()).toContain('空')
  })
})
