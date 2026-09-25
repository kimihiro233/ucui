import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcSelect from '../antd/select'
import { selectContract } from './select.contract'

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
]

selectContract('ant-design-vue', UcSelect)

describe('UcSelect ant-design-vue 专属映射', () => {
  it('渲染 ant-select 结构', () => {
    const wrapper = mount(UcSelect, { props: { options } })
    expect(wrapper.find('.ant-select').exists()).toBe(true)
  })

  it('size=small 映射为 ant-select-sm', () => {
    const wrapper = mount(UcSelect, { props: { options, size: 'small' } })
    expect(wrapper.find('.ant-select').classes()).toContain('ant-select-sm')
  })
})
