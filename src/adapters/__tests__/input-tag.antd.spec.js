import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UcInputTag from '../antd/input-tag'
import { inputTagContract } from './input-tag.contract'

inputTagContract('ant-design-vue', UcInputTag)

describe('UcInputTag ant-design-vue 专属映射（ASelect mode=tags 桥接）', () => {
  const innerOf = (w) => w.findComponent({ name: 'ASelect' })

  it('桥接为 ASelect mode="tags"', () => {
    const w = mount(UcInputTag, { props: { modelValue: [] } })
    expect(innerOf(w).exists()).toBe(true)
    expect(innerOf(w).props('mode')).toBe('tags')
  })

  it('value 绑定 modelValue 数组', () => {
    const w = mount(UcInputTag, { props: { modelValue: ['vue', 'vite'] } })
    expect(innerOf(w).props('value')).toEqual(['vue', 'vite'])
  })

  it('clearable → allowClear 映射', () => {
    const w = mount(UcInputTag, { props: { modelValue: [], clearable: true } })
    expect(innerOf(w).props('allowClear')).toBe(true)
  })

  it('max 声明后丢弃不透传（antd 无对等能力，防 DOM 属性污染）', () => {
    const w = mount(UcInputTag, { props: { modelValue: [], max: 3 } })
    expect(innerOf(w).props('maxTagCount')).toBeUndefined()
    expect(w.find('.ant-select').attributes('max')).toBeUndefined()
  })

  it('size default → middle 映射', () => {
    const w = mount(UcInputTag, { props: { modelValue: [] } })
    expect(innerOf(w).props('size')).toBe('middle')
  })

  it('标签渲染为 ant-select-selection-item', () => {
    const w = mount(UcInputTag, { props: { modelValue: ['vue', 'vite'] } })
    expect(w.findAll('.ant-select-selection-item')).toHaveLength(2)
  })
})
