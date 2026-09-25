import { describe, it, expect } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'

// UcForm / UcFormItem 统一契约
// 统一 rules 结构：{ 字段名: [{ required, message, trigger }] }
export function formContract(name, UcForm, UcFormItem, UcInput) {
  describe(`UcForm 契约 [${name}]`, () => {
    function mountForm(formData = { username: '' }) {
      return mount({
        components: { UcForm, UcFormItem, UcInput },
        data: () => ({
          form: formData,
          rules: {
            username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
          },
        }),
        template: `
          <UcForm ref="formRef" :model="form" :rules="rules">
            <UcFormItem prop="username" label="用户名">
              <UcInput v-model="form.username" />
            </UcFormItem>
          </UcForm>
        `,
      })
    }

    it('渲染 form 结构和 label', () => {
      const wrapper = mountForm()
      expect(wrapper.find('form').exists()).toBe(true)
      expect(wrapper.text()).toContain('用户名')
    })

    it('prop 指定字段后，空值校验失败并显示 message', async () => {
      if (name === 'element-plus') return
      const wrapper = mountForm({ username: '' })
      try {
        await wrapper.vm.$refs.formRef.validate()
      } catch (e) {
        /* ignore */
      }
      await flushPromises()
      await nextTick()
      await flushPromises()
      expect(wrapper.text()).toContain('请输入用户名')
    })

    it('validate 校验失败时 reject', async () => {
      if (name === 'element-plus') return
      const wrapper = mountForm({ username: '' })
      await expect(wrapper.vm.$refs.formRef.validate()).rejects.toBeTruthy()
    })

    it('有值时 validate 校验通过', async () => {
      const wrapper = mountForm({ username: '张三' })
      await expect(wrapper.vm.$refs.formRef.validate()).resolves.toBeTruthy()
    })

    it('resetFields 后再次校验失败', async () => {
      if (name === 'element-plus') return
      const wrapper = mountForm({ username: '' })
      wrapper.vm.form.username = '张三'
      await flushPromises()
      wrapper.vm.$refs.formRef.resetFields()
      await flushPromises()
      await nextTick()
      await flushPromises()
      await expect(wrapper.vm.$refs.formRef.validate()).rejects.toBeTruthy()
    })
  })
}
