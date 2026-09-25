import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// UcInputTag 契约：两端都必须满足的标签输入行为
// element 原生 ElInputTag；antd 桥接 ASelect mode="tags"（rc-select 行为）
// 注意（踩坑 84）：v-model 载体监听器必须放 props 内
export function inputTagContract(libName, UcInputTag) {
  const isElement = libName === 'element-plus'
  const inputSel = isElement ? '.el-input-tag__input' : 'input.ant-select-selection-search-input'
  describe(`UcInputTag 契约 [${libName}]`, () => {
    const mountTag = (props = {}) => {
      let wrapper
      wrapper = mount(UcInputTag, {
        props: {
          modelValue: [],
          ...props,
          'onUpdate:modelValue': (v) => wrapper.setProps({ modelValue: v }),
        },
      })
      return wrapper
    }

    it('基础渲染：v-model 标签展示', async () => {
      const w = mountTag({ modelValue: ['vue', 'vite'] })
      await nextTick()
      const text = w.text()
      expect(text).toContain('vue')
      expect(text).toContain('vite')
      w.unmount()
    })

    it('空值显示 placeholder（element input attribute / antd 占位元素文本）', () => {
      const w = mountTag({ placeholder: '请输入标签' })
      if (isElement) {
        expect(w.find(inputSel).attributes('placeholder')).toBe('请输入标签')
      } else {
        expect(w.text()).toContain('请输入标签')
      }
      w.unmount()
    })

    it('回车添加标签 → update:modelValue + change', async () => {
      const w = mountTag({ modelValue: [] })
      const ipt = w.find(inputSel)
      await ipt.setValue('vue')
      await ipt.trigger('keydown.enter')
      await nextTick()
      expect(w.emitted('update:modelValue').at(-1)[0]).toEqual(['vue'])
      expect(w.emitted('change').at(-1)[0]).toEqual(['vue'])
      w.unmount()
    })

    it('Backspace 删除末尾标签', async () => {
      const w = mountTag({ modelValue: ['vue', 'vite'] })
      await nextTick()
      const ipt = w.find(inputSel)
      await ipt.trigger('keydown.backspace')
      await nextTick()
      expect(w.emitted('update:modelValue').at(-1)[0]).toEqual(['vue'])
      w.unmount()
    })

    it('clearable 清空 → update:modelValue []（element click / antd mousedown）', async () => {
      const w = mountTag({ modelValue: ['vue'], clearable: true })
      await nextTick()
      if (isElement) {
        // element 清空按钮仅在 hover 或聚焦时渲染（showClear 含 isFocused||hovering 条件）
        await w.find('.el-input-tag').trigger('mouseenter')
        await nextTick()
      }
      const clearBtn = isElement ? w.find('.el-input-tag__clear') : w.find('.ant-select-clear')
      expect(clearBtn.exists()).toBe(true)
      await clearBtn.trigger(isElement ? 'click' : 'mousedown')
      await nextTick()
      expect(w.emitted('update:modelValue').at(-1)[0]).toEqual([])
      w.unmount()
    })

    it('disabled 置灰', () => {
      const w = mountTag({ modelValue: ['vue'], disabled: true })
      const cls = isElement ? w.find('.el-input-tag').classes() : w.find('.ant-select').classes()
      expect(cls).toContain(isElement ? 'is-disabled' : 'ant-select-disabled')
      w.unmount()
    })

    it('change 归一化（element 声明式 emits 走 $emit / antd 函数 prop 直调）', async () => {
      const w = mountTag({ modelValue: [] })
      if (isElement) {
        w.findComponent({ name: 'ElInputTag' }).vm.$emit('change', ['a', 'b'])
      } else {
        w.findComponent({ name: 'ASelect' }).props('onChange')(['a', 'b'])
      }
      await nextTick()
      expect(w.emitted('change').at(-1)[0]).toEqual(['a', 'b'])
      w.unmount()
    })
  })
}
