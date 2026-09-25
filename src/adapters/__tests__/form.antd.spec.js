import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { UcForm, UcFormItem } from '../antd/form'
import UcInput from '../antd/input'
import { formContract } from './form.contract'

formContract('ant-design-vue', UcForm, UcFormItem, UcInput)

describe('UcForm ant-design-vue 专属映射', () => {
  it('渲染 ant-form / ant-form-item 结构', () => {
    const wrapper = mount({
      components: { UcForm, UcFormItem, UcInput },
      data: () => ({ form: { a: '' } }),
      template: '<UcForm :model="form"><UcFormItem prop="a" label="字段"><UcInput v-model="form.a" /></UcFormItem></UcForm>',
    })
    expect(wrapper.find('.ant-form').exists()).toBe(true)
    expect(wrapper.find('.ant-form-item').exists()).toBe(true)
  })

  it('labelPosition=top 映射为 vertical 布局', () => {
    const wrapper = mount({
      components: { UcForm, UcFormItem, UcInput },
      data: () => ({ form: { a: '' } }),
      template: '<UcForm :model="form" label-position="top"><UcFormItem prop="a" label="字段"><UcInput v-model="form.a" /></UcFormItem></UcForm>',
    })
    expect(wrapper.find('.ant-form-vertical').exists()).toBe(true)
  })
})
