import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// UcPageHeader 统一契约
// props: title / content(副标题) / ghost(antd 单边)；emits: back
// 插槽：icon / title / content / extra / breadcrumb / default(主体)
export function pageHeaderContract(libName, UcPageHeader) {
  const isElement = libName === 'element-plus'
  const rootSel = isElement ? '.el-page-header' : '.ant-page-header'
  const titleSel = isElement
    ? '.el-page-header__title'
    : '.ant-page-header-heading-title'
  const contentSel = isElement
    ? '.el-page-header__content'
    : '.ant-page-header-heading-sub-title'
  const backBtnSel = isElement
    ? '.el-page-header__back'
    : '.ant-page-header-back-button'
  const iconWrapSel = isElement ? '.el-page-header__icon' : '.ant-page-header-back'
  const extraSel = isElement
    ? '.el-page-header__extra'
    : '.ant-page-header-heading-extra'
  const mainSel = isElement ? '.el-page-header__main' : '.ant-page-header-content'

  describe(`UcPageHeader 契约 [${libName}]`, () => {
    it('渲染页头根节点', () => {
      const wrapper = mount(UcPageHeader)
      expect(wrapper.find(rootSel).exists()).toBe(true)
    })

    it('title 渲染为标题文本', () => {
      const wrapper = mount(UcPageHeader, { props: { title: '用户管理' } })
      expect(wrapper.find(titleSel).text()).toBe('用户管理')
    })

    it('content 渲染为标题旁副标题文本', () => {
      const wrapper = mount(UcPageHeader, {
        props: { title: '用户管理', content: '编辑资料' },
      })
      expect(wrapper.find(contentSel).text()).toBe('编辑资料')
    })

    it('返回按钮恒渲染，点击抛 back（无参）', async () => {
      const wrapper = mount(UcPageHeader, { props: { title: '详情' } })
      // antd 仅在 onBack 存在时才渲染返回按钮，统一层要求双端行为一致：恒渲染
      expect(wrapper.find(backBtnSel).exists()).toBe(true)
      await wrapper.find(backBtnSel).trigger('click')
      expect(wrapper.emitted('back')).toBeTruthy()
      expect(wrapper.emitted('back')[0]).toEqual([])
    })

    it('icon 插槽替换返回箭头内容', () => {
      const wrapper = mount(UcPageHeader, {
        props: { title: '详情' },
        slots: { icon: '<span>GO-BACK</span>' },
      })
      expect(wrapper.find(iconWrapSel).text()).toContain('GO-BACK')
    })

    it('extra 插槽渲染操作区', () => {
      const wrapper = mount(UcPageHeader, {
        props: { title: '详情' },
        slots: { extra: '<button>新增</button>' },
      })
      expect(wrapper.find(extraSel).text()).toContain('新增')
    })

    it('breadcrumb 插槽渲染面包屑区', () => {
      const wrapper = mount(UcPageHeader, {
        props: { title: '详情' },
        slots: { breadcrumb: '<nav>首页 / 详情</nav>' },
      })
      expect(wrapper.html()).toContain('首页 / 详情')
    })

    it('默认插槽渲染主体内容区', () => {
      const wrapper = mount(UcPageHeader, {
        props: { title: '详情' },
        slots: { default: '<p>页面主体</p>' },
      })
      expect(wrapper.find(mainSel).text()).toContain('页面主体')
    })

    it('class 逃生舱落到页头', () => {
      const wrapper = mount(UcPageHeader, {
        props: { title: '详情' },
        attrs: { class: 'my-page-header' },
      })
      expect(wrapper.html()).toContain('my-page-header')
    })
  })
}
