import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcTable from '../element/table'
import { tableContract } from './table.contract'

tableContract('element-plus', UcTable)

describe('UcTable element-plus 专属映射', () => {
  it('渲染 el-table', () => {
    const wrapper = mount(UcTable, {
      props: {
        columns: [{ key: 'name', title: '姓名' }],
        data: [{ name: '张三' }],
      },
    })
    expect(wrapper.find('.el-table').exists()).toBe(true)
  })
})
