import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcCol from '../element/col'
import { colContract } from './col.contract'

colContract('element-plus', UcCol)

describe('UcCol element-plus 专属映射', () => {
  it('push/pull 生成 element 栅格类', () => {
    const wrapper = mount(UcCol, {
      props: { span: 12, push: 3, pull: 1 },
      slots: { default: '<div>x</div>' },
    })
    const classes = wrapper.find('.el-col').classes()
    expect(classes).toContain('el-col-push-3')
    expect(classes).toContain('el-col-pull-1')
  })
})
