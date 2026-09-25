import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcPagination from '../element/pagination'
import { paginationContract } from './pagination.contract'

paginationContract('element-plus', UcPagination)

describe('UcPagination element-plus 专属映射', () => {
  it('渲染 el-pagination', () => {
    const wrapper = mount(UcPagination, {
      props: { modelValue: 1, total: 50, pageSize: 10 },
    })
    expect(wrapper.find('.el-pagination').exists()).toBe(true)
  })

  it('当前页高亮 is-active', () => {
    const wrapper = mount(UcPagination, {
      props: { modelValue: 2, total: 50, pageSize: 10 },
    })
    const active = wrapper.findAll('.el-pager li').find((n) => n.classes().includes('is-active'))
    expect(active.text().trim()).toBe('2')
  })
})
