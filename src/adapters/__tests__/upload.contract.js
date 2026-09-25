import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// UcUpload 契约：v-model(文件列表)/action/disabled/listType/@change
export function uploadContract(libName, UcUpload, options = {}) {
  const { innerName } = options

  describe(`UcUpload 契约 [${libName}]`, () => {
    it('渲染隐藏 file input 与默认插槽触发器', () => {
      const wrapper = mount(UcUpload, {
        slots: { default: '<button class="trigger">上传</button>' },
      })
      expect(wrapper.find('input[type="file"]').exists()).toBe(true)
      expect(wrapper.find('.trigger').exists()).toBe(true)
    })

    it('modelValue 渲染文件名列表', async () => {
      const wrapper = mount(UcUpload, {
        props: {
          modelValue: [
            { name: 'a.png', status: 'success', uid: '1' },
            { name: 'b.png', status: 'success', uid: '2' },
          ],
        },
      })
      await flushPromises()
      expect(wrapper.text()).toContain('a.png')
      expect(wrapper.text()).toContain('b.png')
    })

    it('disabled 透传', async () => {
      const wrapper = mount(UcUpload, { props: { disabled: true } })
      await flushPromises()
      expect(wrapper.html()).toContain('disabled')
    })

    it('change 事件归一化为 (file, fileList)', async () => {
      const wrapper = mount(UcUpload)
      const inner = wrapper.findComponent({ name: innerName })
      expect(inner.exists()).toBe(true)
      const file = { name: 'c.png', uid: '3', status: 'success' }
      const files = [file]
      if (libName === 'element') {
        inner.props('onChange')(file, files)
      } else {
        inner.props('onChange')({ file, fileList: files })
      }
      await flushPromises()
      const emitted = wrapper.emitted('change')
      expect(emitted).toBeTruthy()
      expect(emitted.at(-1)[0]).toEqual(file)
      expect(emitted.at(-1)[1]).toEqual(files)
    })

    it('文件列表变化归一化为 update:modelValue', async () => {
      const wrapper = mount(UcUpload)
      const inner = wrapper.findComponent({ name: innerName })
      const files = [{ name: 'd.png', uid: '4', status: 'success' }]
      if (libName === 'element') {
        // element 无 update:fileList，change 时同步归一化
        inner.props('onChange')(files[0], files)
      } else {
        inner.vm.$emit('update:fileList', files)
      }
      await flushPromises()
      const emitted = wrapper.emitted('update:modelValue')
      expect(emitted).toBeTruthy()
      expect(emitted.at(-1)[0]).toEqual(files)
    })

    it('class 透传（逃生舱）', () => {
      const wrapper = mount(UcUpload, { attrs: { class: 'my-upload' } })
      expect(wrapper.html()).toContain('my-upload')
    })
  })
}
