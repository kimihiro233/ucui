import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcPagination from '../antd/pagination'
import { paginationContract } from './pagination.contract'

paginationContract('ant-design-vue', UcPagination)

describe('UcPagination ant-design-vue 专属映射', () => {
  it('渲染 ant-pagination', () => {
    const wrapper = mount(UcPagination, {
      props: { modelValue: 1, total: 50, pageSize: 10 },
    })
    expect(wrapper.find('.ant-pagination').exists()).toBe(true)
  })

  it('当前页高亮 ant-pagination-item-active', () => {
    const wrapper = mount(UcPagination, {
      props: { modelValue: 2, total: 50, pageSize: 10 },
    })
    expect(wrapper.find('.ant-pagination-item-active').text().trim()).toBe('2')
  })
})
