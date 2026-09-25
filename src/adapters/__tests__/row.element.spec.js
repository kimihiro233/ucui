import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcRow from '../element/row'
import { rowContract } from './row.contract'

rowContract('element-plus', UcRow)

describe('UcRow element-plus 专属映射', () => {
  it('根节点带 el-row 及 justify/align 修饰类', () => {
    const wrapper = mount(UcRow, {
      props: { justify: 'space-between', align: 'bottom' },
      slots: { default: '<div>x</div>' },
    })
    const root = wrapper.find('.el-row')
    expect(root.exists()).toBe(true)
    expect(root.classes()).toContain('is-justify-space-between')
    expect(root.classes()).toContain('is-align-bottom')
  })
})
