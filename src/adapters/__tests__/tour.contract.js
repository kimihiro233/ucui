import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

// UcTour 统一契约：
// v-model=是否打开；v-model:current=当前步骤；steps=[{target?,title,description?,placement?}]
// 引导卡片 teleport/portal 到 body，定位依赖 floating-ui，渲染断言用"出现则校验"
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function tourContract(libName, UcTour) {
  const isElement = libName === 'element-plus'
  const innerName = isElement ? 'ElTour' : 'ATour'

  const sampleSteps = [
    { title: '欢迎', description: '第一步描述' },
    { title: '继续', description: '第二步描述' },
  ]

  let wrapper
  const mountTour = (props = {}) => {
    wrapper = mount(UcTour, {
      props: { modelValue: true, current: 0, steps: sampleSteps, ...props },
    })
    return wrapper
  }

  beforeEach(() => {
    document.body.innerHTML = ''
  })
  afterEach(() => {
    wrapper?.unmount()
    wrapper = null
    document.body.innerHTML = ''
  })

  describe(`UcTour 契约 [${libName}]`, () => {
    it('open 时引导卡片出现则校验标题与描述', async () => {
      mountTour()
      await flushPromises()
      await sleep(50)
      const title = document.querySelector('.el-tour__title, .ant-tour-title')
      // 双端均 Teleport 到 body，等待 floating-ui/定位 effect 完成后应真实渲染
      expect(title).toBeTruthy()
      expect(title.textContent).toContain('欢迎')
      const desc = document.querySelector('.el-tour__body span, .ant-tour-description')
      expect(desc.textContent).toContain('第一步描述')
    })

    it('closed 时不渲染引导卡片', async () => {
      mountTour({ modelValue: false })
      await flushPromises()
      await sleep(20)
      expect(document.querySelector('.el-tour__title, .ant-tour-title')).toBeFalsy()
    })

    it('打开状态映射到底层', () => {
      mountTour()
      const inner = wrapper.findComponent({ name: innerName })
      expect(inner.props(isElement ? 'modelValue' : 'open')).toBe(true)
    })

    it('steps 的 title/description 映射', async () => {
      mountTour()
      if (isElement) {
        // ElTourSteps 只挂载当前步骤的 ElTourStep，切步后校验第二步
        const step0 = wrapper.findComponent({ name: 'ElTourStep' })
        expect(step0.props('title')).toBe('欢迎')
        await wrapper.setProps({ current: 1 })
        await flushPromises()
        const step1 = wrapper.findComponent({ name: 'ElTourStep' })
        expect(step1.props('description')).toBe('第二步描述')
      } else {
        const steps = wrapper.findComponent({ name: innerName }).props('steps')
        expect(steps.length).toBe(2)
        expect(steps[0].title).toBe('欢迎')
        expect(steps[1].description).toBe('第二步描述')
      }
    })

    it('target 与 placement 透传', () => {
      const target = () => null
      const steps = [{ title: 't1', description: 'd1', placement: 'bottom', target }]
      mountTour({ steps })
      if (isElement) {
        const step = wrapper.findComponent({ name: 'ElTourStep' })
        expect(step.props('target')).toBe(target)
        expect(step.props('placement')).toBe('bottom')
      } else {
        const step = wrapper.findComponent({ name: innerName }).props('steps')[0]
        expect(step.target).toBe(target)
        expect(step.placement).toBe('bottom')
      }
    })

    it('mask/showArrow/type 映射', () => {
      mountTour({ mask: false, showArrow: false, type: 'primary' })
      const inner = wrapper.findComponent({ name: innerName })
      expect(inner.props('mask')).toBe(false)
      expect(inner.props(isElement ? 'showArrow' : 'arrow')).toBe(false)
      expect(inner.props('type')).toBe('primary')
    })

    it('current 透传', () => {
      mountTour({ current: 1 })
      expect(wrapper.findComponent({ name: innerName }).props('current')).toBe(1)
    })

    it('update:current 归一化', () => {
      mountTour()
      wrapper.findComponent({ name: innerName }).vm.$emit('update:current', 1)
      expect(wrapper.emitted('update:current')[0]).toEqual([1])
    })

    it('close 归一化（antd 额外关闭 v-model）', () => {
      mountTour()
      const inner = wrapper.findComponent({ name: innerName })
      if (isElement) {
        inner.vm.$emit('close', 1)
      } else {
        // antd 的 onClose 是函数 prop（经 attrs 透传给 vc-tour）
        inner.props('onClose')(1)
        expect(wrapper.emitted('update:modelValue')[0]).toEqual([false])
      }
      expect(wrapper.emitted('close')[0]).toEqual([1])
    })

    it('finish 归一化', () => {
      mountTour()
      const inner = wrapper.findComponent({ name: innerName })
      if (isElement) {
        inner.vm.$emit('finish')
      } else {
        inner.props('onFinish')()
      }
      expect(wrapper.emitted('finish')).toBeTruthy()
    })

    it('change 归一化', () => {
      mountTour()
      wrapper.findComponent({ name: innerName }).vm.$emit('change', 1)
      expect(wrapper.emitted('change')[0]).toEqual([1])
    })
  })
}
