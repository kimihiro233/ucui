import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// UcInputOtp 统一契约
// element 侧包 ElInputOtp（.el-input-otp 结构）；antd 侧为原生兜底（.uc-input-otp 结构）
// 行为对齐 element 语义：逐格输入/粘贴分发、validator 拦截、填满 finish、失焦 change
export function inputOtpContract(libName, UcInputOtp) {
  const isElement = libName === 'element-plus'
  const rootSelector = isElement ? '.el-input-otp' : '.uc-input-otp'
  const inputSelector = isElement ? '.el-input-otp__input' : '.uc-input-otp__input'

  // v-model 载体：change 在失焦时才 emit，需要双向绑定才能观测到 prop 变化
  // 注意：'onUpdate:modelValue' 必须放 props 内（顶层挂载选项不会传给组件）；
  // 焦点断言依赖真实 DOM，必须 attachTo document.body（detached 下 happy-dom 不更新 activeElement）
  const mountOtp = (props = {}) => {
    let wrapper
    wrapper = mount(UcInputOtp, {
      props: {
        modelValue: '',
        ...props,
        'onUpdate:modelValue': (v) => wrapper.setProps({ modelValue: v }),
      },
      attachTo: document.body,
    })
    return wrapper
  }

  afterEach(() => {
    document.body.innerHTML = ''
  })

  describe(`UcInputOtp 契约 [${libName}]`, () => {
    it('渲染 length 个输入格（默认 6）', () => {
      const wrapper = mountOtp()
      expect(wrapper.find(rootSelector).exists()).toBe(true)
      expect(wrapper.findAll(inputSelector).length).toBe(6)
    })

    it('length 自定义输入格数量', () => {
      const wrapper = mountOtp({ length: 4 })
      expect(wrapper.findAll(inputSelector).length).toBe(4)
    })

    it('modelValue 按位分发到输入格', () => {
      const wrapper = mountOtp({ modelValue: 'a1' })
      const inputs = wrapper.findAll(inputSelector)
      expect(inputs[0].element.value).toBe('a')
      expect(inputs[1].element.value).toBe('1')
      expect(inputs[2].element.value).toBe('')
    })

    it('输入单字符 emit update:modelValue 并前进一格', async () => {
      const wrapper = mountOtp()
      const inputs = wrapper.findAll(inputSelector)
      await inputs[0].setValue('7')
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['7'])
      expect(document.activeElement).toBe(inputs[1].element)
    })

    it('填满最后一格 emit finish', async () => {
      const wrapper = mountOtp({ length: 4, modelValue: '123' })
      const inputs = wrapper.findAll(inputSelector)
      await inputs[3].setValue('4')
      expect(wrapper.emitted('finish')).toBeTruthy()
      expect(wrapper.emitted('finish')[0]).toEqual(['1234'])
    })

    it('validator 拦截非法字符：不 emit', async () => {
      const wrapper = mountOtp({ validator: (v) => /^[0-9]$/.test(v) })
      const inputs = wrapper.findAll(inputSelector)
      await inputs[0].setValue('a')
      expect(wrapper.emitted('update:modelValue')).toBeUndefined()
      await inputs[0].setValue('9')
      expect(wrapper.emitted('update:modelValue')[0]).toEqual(['9'])
    })

    it('mask 渲染为密码框', () => {
      const wrapper = mountOtp({ mask: true })
      expect(wrapper.findAll(inputSelector)[0].attributes('type')).toBe('password')
    })

    it('disabled 生效', () => {
      const wrapper = mountOtp({ disabled: true })
      expect(wrapper.findAll(inputSelector)[0].attributes('disabled')).toBeDefined()
    })

    it('失焦且有变化时 emit change（v-model 场景）', async () => {
      const wrapper = mountOtp()
      const inputs = wrapper.findAll(inputSelector)
      // happy-dom 对原生 focus() 不保证派发事件，统一用 trigger 确定性触发
      await inputs[0].trigger('focus')
      await inputs[0].setValue('7')
      await inputs[0].trigger('blur')
      await nextTick()
      expect(wrapper.emitted('change')).toBeTruthy()
      expect(wrapper.emitted('change')[0]).toEqual(['7'])
    })

    it('class 逃生舱落到根节点', () => {
      const wrapper = mountOtp({ class: 'my-otp' })
      expect(wrapper.find(rootSelector).classes()).toContain('my-otp')
    })
  })
}
