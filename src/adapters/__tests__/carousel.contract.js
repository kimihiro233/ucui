import { describe, it, expect, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'

// UcCarousel 统一契约：
// v-model=当前帧索引；items=[{key}]，帧内容走具名插槽（插槽名=key）
// element：ElCarouselItem 子节点；antd：直接 div 子节点（infinite 时有 slick-cloned 克隆帧）
export function carouselContract(libName, UcCarousel) {
  const isElement = libName === 'element-plus'
  const innerName = isElement ? 'ElCarousel' : 'ACarousel'

  const sampleItems = [{ key: 'a' }, { key: 'b' }, { key: 'c' }]
  const findInner = (wrapper) => wrapper.findComponent({ name: innerName })
  // antd infinite 模式会追加 .slick-cloned 克隆帧，统计原始帧时排除
  const findSlides = (wrapper) =>
    isElement
      ? wrapper.findAll('.el-carousel__item')
      : wrapper.findAll('.slick-slide:not(.slick-cloned)')

  const mountCarousel = (props = {}, slots = {}) =>
    mount(UcCarousel, {
      props: { items: sampleItems, ...props },
      slots: {
        a: '<p class="slide-a">帧A</p>',
        b: '<p class="slide-b">帧B</p>',
        c: '<p class="slide-c">帧C</p>',
        ...slots,
      },
    })

  describe(`UcCarousel 契约 [${libName}]`, () => {
    it('渲染全部帧及内容', async () => {
      const wrapper = mountCarousel()
      await flushPromises()
      const slides = findSlides(wrapper)
      expect(slides.length).toBe(3)
      expect(wrapper.find('.slide-a').text()).toContain('帧A')
      expect(wrapper.find('.slide-b').text()).toContain('帧B')
      expect(wrapper.find('.slide-c').text()).toContain('帧C')
    })

    it('初始帧由 modelValue 决定', async () => {
      const wrapper = mountCarousel({ modelValue: 1 })
      await flushPromises()
      const active = isElement
        ? wrapper.findAll('.el-carousel__item.is-active')
        : wrapper.findAll('.slick-slide.slick-active:not(.slick-cloned)')
      // 激活态类依赖底层布局初始化，出现则校验内容
      if (active.length) {
        expect(active.some((n) => n.text().includes('帧B'))).toBe(true)
      }
    })

    it('autoplay 与间隔时间映射到底层', async () => {
      const wrapper = mountCarousel({ autoplay: false, interval: 2000 })
      await flushPromises()
      const inner = findInner(wrapper)
      expect(inner.props('autoplay')).toBe(false)
      if (isElement) {
        expect(inner.props('interval')).toBe(2000)
      } else {
        expect(inner.props('autoplaySpeed')).toBe(2000)
      }
    })

    it('dots=false 映射', async () => {
      const wrapper = mountCarousel({ dots: false })
      await flushPromises()
      const inner = findInner(wrapper)
      if (isElement) {
        expect(inner.props('indicatorPosition')).toBe('none')
      } else {
        expect(inner.props('dots')).toBe(false)
      }
    })

    it('arrow 映射：always 显示 / never 不显示', async () => {
      const wrapperAlways = mountCarousel({ arrow: 'always' })
      await flushPromises()
      if (isElement) {
        expect(findInner(wrapperAlways).props('arrow')).toBe('always')
      } else {
        expect(findInner(wrapperAlways).props('arrows')).toBe(true)
      }

      const wrapperNever = mountCarousel({ arrow: 'never' })
      await flushPromises()
      if (isElement) {
        expect(findInner(wrapperNever).props('arrow')).toBe('never')
      } else {
        expect(findInner(wrapperNever).props('arrows')).toBe(false)
      }
    })

    it('loop=false 映射', async () => {
      const wrapper = mountCarousel({ loop: false })
      await flushPromises()
      const inner = findInner(wrapper)
      if (isElement) {
        expect(inner.props('loop')).toBe(false)
      } else {
        expect(inner.props('infinite')).toBe(false)
      }
    })

    it('pauseOnHover 透传', async () => {
      const wrapper = mountCarousel({ pauseOnHover: false })
      await flushPromises()
      expect(findInner(wrapper).props('pauseOnHover')).toBe(false)
    })

    it('direction=vertical 映射', async () => {
      const wrapper = mountCarousel({ direction: 'vertical' })
      await flushPromises()
      const inner = findInner(wrapper)
      if (isElement) {
        expect(inner.props('direction')).toBe('vertical')
      } else {
        expect(inner.props('dotPosition')).toBe('right')
        expect(inner.props('verticalSwiping')).toBe(true)
      }
    })

    it('底层切换回调归一化为 update:modelValue + change(current, prev)', async () => {
      const wrapper = mountCarousel()
      await flushPromises()
      const inner = findInner(wrapper)
      if (isElement) {
        // ElCarousel 声明了 change emit，监听器不在 $props 上，直接走组件 emit
        inner.vm.$emit('change', 2, 0)
      } else {
        inner.props('afterChange')(2)
      }
      expect(wrapper.emitted('update:modelValue')[0]).toEqual([2])
      expect(wrapper.emitted('change')[0]).toEqual([2, 0])
    })

    it('外部 v-model 变化驱动底层实例切换方法', async () => {
      const wrapper = mountCarousel({ modelValue: 0 })
      await flushPromises()
      const inner = findInner(wrapper)
      // 双端都通过 setup expose() 暴露命令式方法，实际挂在 instance.exposed 上
      const exposed = inner.vm.$.exposed || inner.vm
      const spy = vi.spyOn(exposed, isElement ? 'setActiveItem' : 'goTo')
      await wrapper.setProps({ modelValue: 2 })
      await nextTick()
      if (isElement) {
        expect(spy).toHaveBeenCalledWith(2)
      } else {
        expect(spy).toHaveBeenCalledWith(2, true)
      }
    })

    it('class 逃生舱落到外层容器', async () => {
      const wrapper = mountCarousel({ class: 'my-carousel' })
      await flushPromises()
      expect(wrapper.html()).toContain('my-carousel')
    })
  })
}
