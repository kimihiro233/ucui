import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcTable from '../antd/table'
import { tableContract } from './table.contract'

tableContract('ant-design-vue', UcTable)

describe('UcTable ant-design-vue 专属映射', () => {
  it('渲染 ant-table', () => {
    const wrapper = mount(UcTable, {
      props: {
        columns: [{ key: 'name', title: '姓名' }],
        data: [{ name: '张三' }],
      },
    })
    expect(wrapper.find('.ant-table').exists()).toBe(true)
  })
})
