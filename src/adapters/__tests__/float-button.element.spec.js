import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcFloatButton from '../element/float-button'
import { floatButtonContract } from './float-button.contract'

floatButtonContract('element-plus', UcFloatButton)

describe('UcFloatButton element-plus 兜底实现', () => {
  it('渲染 uc-float-btn 结构（button type=button）', () => {
    const wrapper = mount(UcFloatButton)
    const root = wrapper.find('.uc-float-btn')
    expect(root.exists()).toBe(true)
    expect(root.attributes('type')).toBe('button')
    expect(root.element.classList.contains('uc-float-btn-circle')).toBe(true)
  })

  it('type=primary 映射 uc-float-btn-primary 类', () => {
    const wrapper = mount(UcFloatButton, { props: { type: 'primary' } })
    expect(wrapper.find('.uc-float-btn').classes()).toContain('uc-float-btn-primary')
  })

  it('square 形态描述文本落在 .uc-float-btn-description', () => {
    const wrapper = mount(UcFloatButton, {
      props: { shape: 'square' },
      slots: { default: '新建流程' },
    })
    expect(wrapper.find('.uc-float-btn-description').text()).toBe('新建流程')
  })

  it('icon 插槽渲染在 .uc-float-btn-icon 图标位', () => {
    const wrapper = mount(UcFloatButton, {
      slots: { icon: '<span class="fb-mark">★</span>' },
    })
    expect(wrapper.find('.uc-float-btn-icon').exists()).toBe(true)
    expect(wrapper.find('.fb-mark').exists()).toBe(true)
  })

  it('兜底样式经 native-styles 注入一次', () => {
    mount(UcFloatButton)
    expect(document.getElementById('uc-float-button-style')).not.toBeNull()
  })
})
