// UniUI 统一组件库类型入口
// 纯 JS 源码项目：本目录仅提供类型声明，不参与构建
// package.json "types" 字段指向本文件，业务侧获得组件 props/事件补全
import type { App } from 'vue'

export * from './components'

// ============ core API ============

declare const UniUI: {
  /**
   * 安装统一组件库（全局注册所有 Uc 组件 + 服务式 API 挂全局属性）
   * @param options.lib 底层库，一个项目只装一套
   */
  install(app: App, options?: { lib?: 'element' | 'antd' }): void
}

export default UniUI

/**
 * 将指定底层库的适配器注册到 app 上（可重复调用实现运行时切库，
 * 已渲染组件需配合子树 :key 重渲染才能拿到新实现）
 */
export declare function applyLib(app: App, lib: 'element' | 'antd'): void

export declare function register(name: string, entry: unknown): void

export declare function registered(): Map<string, unknown>

export declare function _clear(): void

// ============ 服务式 API ============

export interface UcMessageService {
  success(content: string, options?: Record<string, any>): void
  error(content: string, options?: Record<string, any>): void
  warning(content: string, options?: Record<string, any>): void
  info(content: string, options?: Record<string, any>): void
}

export interface UcNotificationService {
  success(title: string, content?: string, options?: Record<string, any>): void
  error(title: string, content?: string, options?: Record<string, any>): void
  warning(title: string, content?: string, options?: Record<string, any>): void
  info(title: string, content?: string, options?: Record<string, any>): void
}

export interface UcMessageBoxOptions {
  type?: 'info' | 'success' | 'warning' | 'error'
  confirmText?: string
  cancelText?: string
}

export interface UcMessageBoxService {
  /** 确认框：确定 resolve('confirm')，取消 reject('cancel') */
  confirm(content: string, title?: string, options?: UcMessageBoxOptions): Promise<'confirm'>
  /** 单按钮提示框 */
  alert(content: string, title?: string, options?: UcMessageBoxOptions): Promise<'confirm'>
  destroyAll(): void
}

// ============ Vue 全局类型增强 ============

declare module 'vue' {
  interface ComponentCustomProperties {
    /** 全局消息提示（app.use(UniUI) 后可用） */
    $message: UcMessageService
    /** 全局通知 */
    $notification: UcNotificationService
    /** 全局确认框 */
    $messageBox: UcMessageBoxService
  }

  // 全局注册组件的模板类型提示（SFC 模板中 <UcButton /> 直接补全）
  interface GlobalComponents {
    UcButton: typeof import('./components')['UcButton']
    UcButtonGroup: typeof import('./components')['UcButtonGroup']
    UcInput: typeof import('./components')['UcInput']
    UcTextarea: typeof import('./components')['UcTextarea']
    UcInputNumber: typeof import('./components')['UcInputNumber']
    UcInputTag: typeof import('./components')['UcInputTag']
    UcInputOtp: typeof import('./components')['UcInputOtp']
    UcAutoComplete: typeof import('./components')['UcAutoComplete']
    UcMentions: typeof import('./components')['UcMentions']
    UcSelect: typeof import('./components')['UcSelect']
    UcTimeSelect: typeof import('./components')['UcTimeSelect']
    UcTimePicker: typeof import('./components')['UcTimePicker']
    UcDatePicker: typeof import('./components')['UcDatePicker']
    UcCalendar: typeof import('./components')['UcCalendar']
    UcCascader: typeof import('./components')['UcCascader']
    UcTreeSelect: typeof import('./components')['UcTreeSelect']
    UcTree: typeof import('./components')['UcTree']
    UcSwitch: typeof import('./components')['UcSwitch']
    UcCheckbox: typeof import('./components')['UcCheckbox']
    UcCheckboxGroup: typeof import('./components')['UcCheckboxGroup']
    UcRadio: typeof import('./components')['UcRadio']
    UcRadioGroup: typeof import('./components')['UcRadioGroup']
    UcSegmented: typeof import('./components')['UcSegmented']
    UcCheckTag: typeof import('./components')['UcCheckTag']
    UcRate: typeof import('./components')['UcRate']
    UcSlider: typeof import('./components')['UcSlider']
    UcForm: typeof import('./components')['UcForm']
    UcFormItem: typeof import('./components')['UcFormItem']
    UcModal: typeof import('./components')['UcModal']
    UcDrawer: typeof import('./components')['UcDrawer']
    UcAlert: typeof import('./components')['UcAlert']
    UcPopconfirm: typeof import('./components')['UcPopconfirm']
    UcTooltip: typeof import('./components')['UcTooltip']
    UcPopover: typeof import('./components')['UcPopover']
    UcSpin: typeof import('./components')['UcSpin']
    UcSkeleton: typeof import('./components')['UcSkeleton']
    UcEmpty: typeof import('./components')['UcEmpty']
    UcResult: typeof import('./components')['UcResult']
    UcProgress: typeof import('./components')['UcProgress']
    UcBacktop: typeof import('./components')['UcBacktop']
    UcFloatButton: typeof import('./components')['UcFloatButton']
    UcTable: typeof import('./components')['UcTable']
    UcTag: typeof import('./components')['UcTag']
    UcBadge: typeof import('./components')['UcBadge']
    UcPagination: typeof import('./components')['UcPagination']
    UcStatistic: typeof import('./components')['UcStatistic']
    UcCountdown: typeof import('./components')['UcCountdown']
    UcDescriptions: typeof import('./components')['UcDescriptions']
    UcAvatar: typeof import('./components')['UcAvatar']
    UcAvatarGroup: typeof import('./components')['UcAvatarGroup']
    UcImage: typeof import('./components')['UcImage']
    UcText: typeof import('./components')['UcText']
    UcList: typeof import('./components')['UcList']
    UcCard: typeof import('./components')['UcCard']
    UcTabs: typeof import('./components')['UcTabs']
    UcCollapse: typeof import('./components')['UcCollapse']
    UcMenu: typeof import('./components')['UcMenu']
    UcBreadcrumb: typeof import('./components')['UcBreadcrumb']
    UcSteps: typeof import('./components')['UcSteps']
    UcDropdown: typeof import('./components')['UcDropdown']
    UcPageHeader: typeof import('./components')['UcPageHeader']
    UcAnchor: typeof import('./components')['UcAnchor']
    UcAffix: typeof import('./components')['UcAffix']
    UcTimeline: typeof import('./components')['UcTimeline']
    UcDivider: typeof import('./components')['UcDivider']
    UcTour: typeof import('./components')['UcTour']
    UcWatermark: typeof import('./components')['UcWatermark']
    UcLayout: typeof import('./components')['UcLayout']
    UcLayoutHeader: typeof import('./components')['UcLayoutHeader']
    UcLayoutContent: typeof import('./components')['UcLayoutContent']
    UcLayoutFooter: typeof import('./components')['UcLayoutFooter']
    UcLayoutSider: typeof import('./components')['UcLayoutSider']
    UcRow: typeof import('./components')['UcRow']
    UcCol: typeof import('./components')['UcCol']
    UcFlex: typeof import('./components')['UcFlex']
    UcSpace: typeof import('./components')['UcSpace']
    UcLink: typeof import('./components')['UcLink']
    UcScrollbar: typeof import('./components')['UcScrollbar']
    UcSplitter: typeof import('./components')['UcSplitter']
    UcSplitterPanel: typeof import('./components')['UcSplitterPanel']
    UcUpload: typeof import('./components')['UcUpload']
    UcTransfer: typeof import('./components')['UcTransfer']
  }
}
