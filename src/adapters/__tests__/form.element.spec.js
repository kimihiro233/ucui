import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { UcForm, UcFormItem } from '../element/form'
import UcInput from '../element/input'
import { formContract } from './form.contract'

formContract('element-plus', UcForm, UcFormItem, UcInput)

describe('UcForm element-plus 专属映射', () => {
  it('渲染 el-form / el-form-item 结构', () => {
    const wrapper = mount({
      components: { UcForm, UcFormItem, UcInput },
      data: () => ({ form: { a: '' } }),
      template: '<UcForm :model="form"><UcFormItem prop="a" label="字段"><UcInput v-model="form.a" /></UcFormItem></UcForm>',
    })
    expect(wrapper.find('.el-form').exists()).toBe(true)
    expect(wrapper.find('.el-form-item').exists()).toBe(true)
  })
})
