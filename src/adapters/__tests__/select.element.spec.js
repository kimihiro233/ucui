import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcSelect from '../element/select'
import { selectContract } from './select.contract'

const options = [
  { label: '选项一', value: '1' },
  { label: '选项二', value: '2' },
]

selectContract('element-plus', UcSelect)

describe('UcSelect element-plus 专属映射', () => {
  it('渲染 el-select 结构', () => {
    const wrapper = mount(UcSelect, { props: { options } })
    expect(wrapper.find('.el-select').exists()).toBe(true)
  })

  it('size=small 映射为 el-select--small', () => {
    const wrapper = mount(UcSelect, { props: { options, size: 'small' } })
    expect(wrapper.html()).toContain('el-select--small')
  })
})
