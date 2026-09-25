import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import UcInputTag from '../element/input-tag'
import { inputTagContract } from './input-tag.contract'

inputTagContract('element-plus', UcInputTag)

describe('UcInputTag element-plus 专属映射（ElInputTag 原生）', () => {
  it('渲染 el-input-tag 结构（__wrapper/__inner/__input）', () => {
    const w = mount(UcInputTag, { props: { modelValue: ['vue'] } })
    expect(w.find('.el-input-tag').exists()).toBe(true)
    expect(w.find('.el-input-tag__inner').exists()).toBe(true)
    expect(w.find('.el-input-tag__input').exists()).toBe(true)
  })

  it('标签渲染为 .el-tag 且数量正确', () => {
    const w = mount(UcInputTag, { props: { modelValue: ['vue', 'vite', 'vitest'] } })
    expect(w.findAll('.el-tag')).toHaveLength(3)
  })

  it('size large → el-input-tag--large 类', () => {
    const w = mount(UcInputTag, { props: { modelValue: [], size: 'large' } })
    expect(w.find('.el-input-tag').classes()).toContain('el-input-tag--large')
  })

  it('max 达到上限后不可再输入（element 单边能力）', async () => {
    const w = mount(UcInputTag, { props: { modelValue: ['a', 'b'], max: 2 } })
    await nextTick()
    const ipt = w.find('.el-input-tag__input')
    await ipt.setValue('c')
    await ipt.trigger('keydown.enter')
    await nextTick()
    expect(w.emitted('update:modelValue')).toBeUndefined()
  })

  it('expose focus/blur 转调 ElInputTag 命令式方法', () => {
    const w = mount(UcInputTag, { props: { modelValue: [] } })
    const inner = w.findComponent({ name: 'ElInputTag' })
    const spy = vi.spyOn(inner.vm.$.exposed || inner.vm, 'focus')
    w.vm.focus()
    expect(spy).toHaveBeenCalled()
    expect(typeof w.vm.blur).toBe('function')
  })
})
