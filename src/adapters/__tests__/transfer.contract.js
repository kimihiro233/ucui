import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

const data = [
  { key: 'a', label: '选项A' },
  { key: 'b', label: '选项B' },
  { key: 'c', label: '选项C', disabled: true },
]

// UcTransfer 契约：v-model(目标 key 数组)/data/titles/@change
export function transferContract(libName, UcTransfer, options = {}) {
  const { innerName } = options

  describe(`UcTransfer 契约 [${libName}]`, () => {
    it('渲染数据源 label 文本', async () => {
      const wrapper = mount(UcTransfer, { props: { data, modelValue: [] } })
      await flushPromises()
      expect(wrapper.text()).toContain('选项A')
      expect(wrapper.text()).toContain('选项B')
      expect(wrapper.text()).toContain('选项C')
    })

    it('titles 渲染为两个面板标题', async () => {
      const wrapper = mount(UcTransfer, {
        props: { data, modelValue: [], titles: ['源列表', '目标列表'] },
      })
      await flushPromises()
      expect(wrapper.text()).toContain('源列表')
      expect(wrapper.text()).toContain('目标列表')
    })

    it('change 事件归一化为 (targetKeys, direction, movedKeys)', async () => {
      const wrapper = mount(UcTransfer, { props: { data, modelValue: [] } })
      const inner = wrapper.findComponent({ name: innerName })
      expect(inner.exists()).toBe(true)
      inner.vm.$emit('change', ['a'], 'right', ['a'])
      await flushPromises()
      const emitted = wrapper.emitted('change')
      expect(emitted).toBeTruthy()
      expect(emitted.at(-1)).toEqual([['a'], 'right', ['a']])
    })

    it('目标 key 变化归一化为 update:modelValue', async () => {
      const wrapper = mount(UcTransfer, { props: { data, modelValue: [] } })
      const inner = wrapper.findComponent({ name: innerName })
      if (libName === 'element') {
        inner.vm.$emit('update:modelValue', ['a', 'b'])
      } else {
        inner.vm.$emit('update:targetKeys', ['a', 'b'])
      }
      await flushPromises()
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted.at(-1)[0]).toEqual(['a', 'b'])
    })

    it('class 透传（逃生舱）', () => {
      const wrapper = mount(UcTransfer, { attrs: { class: 'my-transfer' } })
      expect(wrapper.html()).toContain('my-transfer')
    })
  })
}
