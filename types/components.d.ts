// UniUI 统一组件库类型声明
// 与 src/adapters/{element,antd} 的统一 API 逐一对齐（来源：project_memory 组件清单）
// 组件统一通过全局注册使用（app.use(UniUI)），本文件同时提供：
//   1. 具名导入类型：import { UcButton } from 'uniui'
//   2. 模板全局组件提示：declare module 'vue' GlobalComponents（见 index.d.ts）
import type {
  DefineComponent,
  CSSProperties,
  ComponentOptionsMixin,
  EmitsOptions,
  EmitsToProps,
  ExtractDefaultPropTypes,
  PublicProps,
} from 'vue'

// ============ 公共类型 ============

/** 带 expose 实例方法/属性的组件声明（方法经模板 ref 调用，如 formRef.value.validate()） */
export type UcComponentWithExpose<
  P extends object,
  Exposed extends object,
  E extends EmitsOptions,
  K extends keyof Exposed & string,
> = DefineComponent<
  P,
  Exposed,
  {},
  {},
  {},
  ComponentOptionsMixin,
  ComponentOptionsMixin,
  E,
  string,
  PublicProps,
  Readonly<P> & ({} extends E ? {} : EmitsToProps<E>),
  ExtractDefaultPropTypes<P>,
  {},
  {},
  {},
  K
>

/** 通用尺寸档位 */
export type UcSize = 'large' | 'default' | 'small'

/** 通用语义色（部分组件只收子集，见各自声明） */
export type UcType = 'primary' | 'default' | 'danger' | 'success' | 'warning' | 'info'

/** 通用选项（UcSelect/UcRadioGroup/UcSegmented/UcCheckboxGroup 等） */
export interface UcOption {
  label: any
  value: any
  disabled?: boolean
}

/** 级联/树形选项（UcCascader/UcTreeSelect） */
export interface UcTreeOption {
  value: any
  label: any
  disabled?: boolean
  children?: UcTreeOption[]
}

/** 弹层触发方式 */
export type UcTrigger = 'hover' | 'click' | 'focus'

type Emits<T> = T & { 'update:modelValue': (value: any) => void }

// ============ 基础组件 ============

export declare const UcButton: DefineComponent<{
  type?: 'primary' | 'default' | 'danger'
  text?: boolean
  link?: boolean
  size?: UcSize
  disabled?: boolean
  loading?: boolean
}, {}, any, any, any, any, any, Emits<{ click: (event: MouseEvent) => void }>>

export declare const UcButtonGroup: DefineComponent<{
  size?: UcSize
  type?: 'primary' | 'default' | 'danger'
  direction?: 'horizontal' | 'vertical'
}, {}, any, any, any, any, any, {}>

export declare const UcInput: DefineComponent<{
  modelValue?: string | number
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  readonly?: boolean
  size?: UcSize
}, {}, any, any, any, any, any, Emits<{
  change: (value: string) => void
  input: (value: string) => void
  focus: (event: FocusEvent) => void
  blur: (event: FocusEvent) => void
}>>

export declare const UcTextarea: DefineComponent<{
  modelValue?: string
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  rows?: number
  maxlength?: number
  showCount?: boolean
}, {}, any, any, any, any, any, Emits<{}>>

export declare const UcInputNumber: DefineComponent<{
  modelValue?: number | null
  min?: number
  max?: number
  step?: number
  precision?: number
  disabled?: boolean
}, {}, any, any, any, any, any, Emits<{ change: (value: number | undefined) => void }>>

/** UcInputTag 实例方法（模板 ref 调用） */
export interface UcInputTagInstance {
  focus(): void
  blur(): void
}

export declare const UcInputTag: UcComponentWithExpose<{
  modelValue?: string[]
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  /** 最多可输入的标签数（element 单边能力，antd 端无对等实现） */
  max?: number
  size?: UcSize
}, UcInputTagInstance, Emits<{
  change: (value: string[]) => void
  focus: (event: FocusEvent) => void
  blur: (event: FocusEvent) => void
}>, 'focus' | 'blur'>

/** UcInputOtp 实例方法（模板 ref 调用） */
export interface UcInputOtpInstance {
  focus(): void
  blur(): void
}

export declare const UcInputOtp: UcComponentWithExpose<{
  modelValue?: string
  length?: number
  mask?: boolean
  disabled?: boolean
  readonly?: boolean
  validator?: (char: string) => boolean
}, UcInputOtpInstance, Emits<{
  change: (value: string) => void
  finish: (value: string) => void
  focus: (event: FocusEvent) => void
  blur: (event: FocusEvent) => void
}>, 'focus' | 'blur'>

export declare const UcAutoComplete: DefineComponent<{
  modelValue?: string
  fetchSuggestions: (query: string, callback: (items: { value: string; label?: string }[]) => void) => void
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  size?: UcSize
}, {}, any, any, any, any, any, Emits<{
  select: (item: { value: string; label?: string }) => void
}>>

export declare const UcMentions: DefineComponent<{
  modelValue?: string
  options?: UcOption[]
  prefix?: string
  split?: string
  placeholder?: string
  disabled?: boolean
  loading?: boolean
}, {}, any, any, any, any, any, Emits<{
  change: (value: string) => void
  select: (option: UcOption) => void
}>>

export declare const UcSelect: DefineComponent<{
  modelValue?: any
  options?: UcOption[]
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
  size?: UcSize
}, {}, any, any, any, any, any, Emits<{ change: (value: any) => void }>>

export declare const UcTimeSelect: DefineComponent<{
  modelValue?: string
  start?: string
  end?: string
  step?: string
  minTime?: string
  maxTime?: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  editable?: boolean
  size?: UcSize
}, {}, any, any, any, any, any, Emits<{ change: (value: string | undefined) => void }>>

export declare const UcTimePicker: DefineComponent<{
  modelValue?: string
  format?: string
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
}, {}, any, any, any, any, any, Emits<{}>>

export declare const UcDatePicker: DefineComponent<{
  modelValue?: string
  format?: string
  placeholder?: string
  clearable?: boolean
  disabled?: boolean
}, {}, any, any, any, any, any, Emits<{}>>

export declare const UcCalendar: DefineComponent<{
  modelValue?: string
  format?: string
}, {}, any, any, any, any, any, Emits<{}>>

export declare const UcCascader: DefineComponent<{
  modelValue?: any[]
  options?: UcTreeOption[]
  clearable?: boolean
  disabled?: boolean
}, {}, any, any, any, any, any, Emits<{}>>

export declare const UcTreeSelect: DefineComponent<{
  modelValue?: any
  options?: UcTreeOption[]
  clearable?: boolean
  disabled?: boolean
}, {}, any, any, any, any, any, Emits<{}>>

export declare const UcTree: DefineComponent<{
  data?: { key: string; label: string; disabled?: boolean; children?: any[] }[]
  showCheckbox?: boolean
  defaultExpandAll?: boolean
  checkedKeys?: string[]
}, {}, any, any, any, any, any, {
  'update:checkedKeys': (keys: string[]) => void
  check: (keys: string[]) => void
  // camelCase：模板 @node-click 编译为 onNodeClick 自动匹配（运行时 emit('node-click') 同样命中）
  nodeClick: (key: string, data: any) => void
}>

export declare const UcSwitch: DefineComponent<{
  modelValue?: boolean
  disabled?: boolean
  loading?: boolean
}, {}, any, any, any, any, any, Emits<{ change: (value: boolean) => void }>>

export declare const UcCheckbox: DefineComponent<{
  modelValue?: boolean
  disabled?: boolean
}, {}, any, any, any, any, any, Emits<{ change: (value: boolean) => void }>>

export declare const UcCheckboxGroup: DefineComponent<{
  modelValue?: any[]
  options?: UcOption[]
  disabled?: boolean
  min?: number
  max?: number
}, {}, any, any, any, any, any, Emits<{ change: (value: any[]) => void }>>

export declare const UcRadio: DefineComponent<{
  modelValue?: boolean
  disabled?: boolean
}, {}, any, any, any, any, any, Emits<{ change: (value: boolean) => void }>>

export declare const UcRadioGroup: DefineComponent<{
  modelValue?: string | number | boolean
  options?: UcOption[]
  disabled?: boolean
  size?: UcSize
  /** 'button' 为按钮形态 */
  type?: 'radio' | 'button'
}, {}, any, any, any, any, any, Emits<{ change: (value: string | number | boolean) => void }>>

export declare const UcSegmented: DefineComponent<{
  modelValue?: string | number
  options?: UcOption[]
  disabled?: boolean
  block?: boolean
  size?: UcSize
}, {}, any, any, any, any, any, Emits<{ change: (value: string | number) => void }>>

export declare const UcCheckTag: DefineComponent<{
  checked?: boolean
  disabled?: boolean
  type?: 'primary' | 'success' | 'info' | 'warning' | 'danger'
}, {}, any, any, any, any, any, {
  'update:checked': (checked: boolean) => void
  change: (checked: boolean) => void
}>

export declare const UcRate: DefineComponent<{
  modelValue?: number
  max?: number
  disabled?: boolean
}, {}, any, any, any, any, any, Emits<{ change: (value: number) => void }>>

export declare const UcSlider: DefineComponent<{
  modelValue?: number
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}, {}, any, any, any, any, any, Emits<{ change: (value: number) => void }>>

// ============ 表单容器 ============

/** UcForm 实例方法（模板 ref 调用） */
export interface UcFormInstance {
  /** 校验整个表单：通过 resolve(true)，失败 reject */
  validate(): Promise<boolean>
  resetFields(): void
  clearValidate(): void
}

export declare const UcForm: UcComponentWithExpose<
  {
    model?: Record<string, any>
    rules?: Record<string, any>
    labelWidth?: string | number
    labelPosition?: 'left' | 'right' | 'top'
    disabled?: boolean
  },
  UcFormInstance,
  {},
  'validate' | 'resetFields' | 'clearValidate'
>

export declare const UcFormItem: DefineComponent<{
  prop?: string
  label?: string
}, {}, any, any, any, any, any, {}>

// ============ 弹层/反馈 ============

export declare const UcModal: DefineComponent<{
  modelValue?: boolean
  title?: string
  width?: string | number
}, {}, any, any, any, any, any, {
  open: () => void
  close: () => void
}>

export declare const UcDrawer: DefineComponent<{
  modelValue?: boolean
  title?: string
  /** 抽屉宽度 */
  size?: string | number
}, {}, any, any, any, any, any, {
  open: () => void
  close: () => void
}>

export declare const UcAlert: DefineComponent<{
  title?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  closable?: boolean
}, {}, any, any, any, any, any, { close: (event: MouseEvent) => void }>

export declare const UcPopconfirm: DefineComponent<{
  title?: string
  confirmText?: string
  cancelText?: string
}, {}, any, any, any, any, any, {
  confirm: () => void
  cancel: () => void
}>

export declare const UcTooltip: DefineComponent<{
  content?: string
  trigger?: UcTrigger
}, {}, any, any, any, any, any, {}>

export declare const UcPopover: DefineComponent<{
  title?: string
  content?: string
  trigger?: UcTrigger
}, {}, any, any, any, any, any, {}>

export declare const UcSpin: DefineComponent<{
  spinning?: boolean
  size?: UcSize
  tip?: string
}, {}, any, any, any, any, any, {}>

export declare const UcSkeleton: DefineComponent<{
  loading?: boolean
  active?: boolean
  rows?: number
}, {}, any, any, any, any, any, {}>

export declare const UcEmpty: DefineComponent<{
  description?: string
  image?: string
  imageSize?: number
}, {}, any, any, any, any, any, {}>

export declare const UcResult: DefineComponent<{
  status?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  subTitle?: string
}, {}, any, any, any, any, any, {}>

export declare const UcProgress: DefineComponent<{
  percentage?: number
}, {}, any, any, any, any, any, {}>

export declare const UcBacktop: DefineComponent<{
  visibilityHeight?: number
  target?: string
  right?: number
  bottom?: number
}, {}, any, any, any, any, any, { click: (event: MouseEvent) => void }>

export declare const UcFloatButton: DefineComponent<{
  type?: 'default' | 'primary'
  shape?: 'circle' | 'square'
  tooltip?: string
  href?: string
  target?: string
}, {}, any, any, any, any, any, { click: (event: MouseEvent) => void }>

// ============ 数据展示 ============

export interface UcTableColumn {
  key: string
  title: string
  render?: (row: Record<string, any>) => any
}

export declare const UcTable: DefineComponent<{
  columns?: UcTableColumn[]
  data?: Record<string, any>[]
}, {}, any, any, any, any, any, {}>

export declare const UcTag: DefineComponent<{
  type?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  closable?: boolean
}, {}, any, any, any, any, any, { close: (event: MouseEvent) => void }>

export declare const UcBadge: DefineComponent<{
  value?: number | string
  max?: number
  dot?: boolean
}, {}, any, any, any, any, any, {}>

export declare const UcPagination: DefineComponent<{
  modelValue?: number
  total?: number
  pageSize?: number
}, {}, any, any, any, any, any, Emits<{ change: (page: number) => void }>>

export declare const UcStatistic: DefineComponent<{
  title?: string
  value?: number | string
  precision?: number
  prefix?: string
  suffix?: string
}, {}, any, any, any, any, any, {}>

export declare const UcCountdown: DefineComponent<{
  /** 目标时间戳（ms） */
  value?: number
  format?: string
  title?: string
  prefix?: string
  suffix?: string
  valueStyle?: CSSProperties
}, {}, any, any, any, any, any, {
  finish: () => void
  change: (remainMs: number) => void
}>

export interface UcDescItem {
  label: string
  value?: any
  span?: number
  render?: (item: UcDescItem) => any
}

export declare const UcDescriptions: DefineComponent<{
  title?: string
  bordered?: boolean
  column?: number
  size?: UcSize
  items?: UcDescItem[]
}, {}, any, any, any, any, any, {}>

export declare const UcAvatar: DefineComponent<{
  size?: number | UcSize
  shape?: 'circle' | 'square'
  src?: string
  alt?: string
}, {}, any, any, any, any, any, {}>

export declare const UcAvatarGroup: DefineComponent<{
  size?: number | UcSize
  shape?: 'circle' | 'square'
  max?: number
  placement?: string
}, {}, any, any, any, any, any, {}>

export declare const UcImage: DefineComponent<{
  src?: string
  alt?: string
  width?: string | number
  height?: string | number
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  preview?: boolean
}, {}, any, any, any, any, any, { error: (event: Event) => void }>

export declare const UcText: DefineComponent<{
  type?: 'default' | 'success' | 'info' | 'warning' | 'danger'
  size?: UcSize
  truncated?: boolean
  lineClamp?: number
  tag?: string
}, {}, any, any, any, any, any, {}>

export declare const UcList: DefineComponent<{
  items?: {
    key?: string | number
    title: string
    description?: string
    avatar?: string
    content?: string
    extra?: string
    actions?: string[]
  }[]
  header?: string
  footer?: string
  bordered?: boolean
  split?: boolean
  loading?: boolean
  size?: UcSize
  itemLayout?: 'horizontal' | 'vertical'
}, {}, any, any, any, any, any, {}>

export declare const UcCard: DefineComponent<{
  title?: string
  bordered?: boolean
  hoverable?: boolean
}, {}, any, any, any, any, any, {}>

export declare const UcTabs: DefineComponent<{
  modelValue?: string
  items?: { key: string; label: string; disabled?: boolean }[]
}, {}, any, any, any, any, any, Emits<{ change: (key: string) => void }>>

export declare const UcCollapse: DefineComponent<{
  modelValue?: string[] | string
  accordion?: boolean
  items?: { key: string; title: string; disabled?: boolean }[]
}, {}, any, any, any, any, any, Emits<{ change: (value: string[] | string) => void }>>

// ============ 导航 ============

export interface UcMenuItem {
  key: string
  label: string
  disabled?: boolean
  children?: UcMenuItem[]
}

export declare const UcMenu: DefineComponent<{
  modelValue?: string
  mode?: 'horizontal' | 'vertical'
  items?: UcMenuItem[]
  defaultOpeneds?: string[]
  uniqueOpened?: boolean
  trigger?: UcTrigger
  collapse?: boolean
}, {}, any, any, any, any, any, {
  select: (key: string, keyPath: string[]) => void
  openChange: (keys: string[]) => void
}>

export interface UcBreadcrumbItem {
  label: string
  to?: string
}

export declare const UcBreadcrumb: DefineComponent<{
  items?: UcBreadcrumbItem[]
  separator?: string
}, {}, any, any, any, any, any, {}>

export declare const UcSteps: DefineComponent<{
  modelValue?: number
  direction?: 'vertical' | 'horizontal'
  items?: { title: string; description?: string }[]
}, {}, any, any, any, any, any, Emits<{ change: (current: number) => void }>>

export interface UcDropdownItem {
  label: string
  key: string
  disabled?: boolean
  divided?: boolean
}

export declare const UcDropdown: DefineComponent<{
  items?: UcDropdownItem[]
  trigger?: 'hover' | 'click'
  disabled?: boolean
}, {}, any, any, any, any, any, { command: (key: string) => void }>

export declare const UcPageHeader: DefineComponent<{
  title?: string
  content?: string
  ghost?: boolean
}, {}, any, any, any, any, any, { back: (event: MouseEvent) => void }>

export interface UcAnchorItem {
  key?: string
  href: string
  title: string
  children?: UcAnchorItem[]
}

export declare const UcAnchor: DefineComponent<{
  items?: UcAnchorItem[]
  direction?: 'vertical' | 'horizontal'
  offset?: number
  bound?: number
  /** 滚动容器 CSS 选择器 */
  container?: string
}, {}, any, any, any, any, any, {
  change: (href: string) => void
  click: (href: string, event: MouseEvent) => void
}>

export declare const UcAffix: DefineComponent<{
  offset?: number
  position?: 'top' | 'bottom'
  /** 固定目标容器 CSS 选择器 */
  target?: string
}, {}, any, any, any, any, any, { change: (fixed: boolean) => void }>

// ============ 时间轴/其他展示 ============

export interface UcTimelineItem {
  content: string
  timestamp?: string
  color?: string
}

export declare const UcTimeline: DefineComponent<{
  items?: UcTimelineItem[]
  mode?: '' | 'left' | 'right' | 'alternate'
  reverse?: boolean
}, {}, any, any, any, any, any, {}>

export declare const UcDivider: DefineComponent<{
  direction?: 'horizontal' | 'vertical'
  orientation?: 'left' | 'center' | 'right'
  dashed?: boolean
}, {}, any, any, any, any, any, {}>

// ============ 引导/水印 ============

export interface UcTourStep {
  /** 目标元素选择器，缺省为居中弹层 */
  target?: string
  title?: string
  description?: string
  placement?: string
}

export declare const UcTour: DefineComponent<{
  modelValue?: boolean
  current?: number
  steps?: UcTourStep[]
  mask?: boolean
  showArrow?: boolean
  showClose?: boolean
  type?: 'default' | 'primary'
}, {}, any, any, any, any, any, {
  'update:current': (current: number) => void
  close: (current: number) => void
  finish: () => void
  change: (current: number) => void
}>

export declare const UcWatermark: DefineComponent<{
  content?: string | string[]
  image?: string
  width?: number
  height?: number
  rotate?: number
  zIndex?: number
  gap?: [number, number]
  offset?: [number, number]
  font?: Record<string, any>
}, {}, any, any, any, any, any, {}>

// ============ 布局 ============

export declare const UcLayout: DefineComponent<{
  direction?: 'vertical' | 'horizontal'
}, {}, any, any, any, any, any, {}>

export declare const UcLayoutHeader: DefineComponent<{
  height?: number | string
}, {}, any, any, any, any, any, {}>

export declare const UcLayoutContent: DefineComponent<{}, {}, any, any, any, any, any, {}>

export declare const UcLayoutFooter: DefineComponent<{
  height?: number | string
}, {}, any, any, any, any, any, {}>

export declare const UcLayoutSider: DefineComponent<{
  width?: number | string
}, {}, any, any, any, any, any, {}>

export declare const UcRow: DefineComponent<{
  gutter?: number
  justify?: 'start' | 'center' | 'end' | 'space-around' | 'space-between' | 'space-evenly'
  align?: 'top' | 'middle' | 'bottom'
}, {}, any, any, any, any, any, {}>

export interface UcColBreakpoint {
  span?: number
  offset?: number
  pull?: number
  push?: number
}

export declare const UcCol: DefineComponent<{
  span?: number
  offset?: number
  pull?: number
  push?: number
  xs?: number | UcColBreakpoint
  sm?: number | UcColBreakpoint
  md?: number | UcColBreakpoint
  lg?: number | UcColBreakpoint
  xl?: number | UcColBreakpoint
}, {}, any, any, any, any, any, {}>

export declare const UcFlex: DefineComponent<{
  vertical?: boolean
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse'
  justify?: string
  align?: string
  /** 数字为 px，档位映射 8/16/24 */
  gap?: number | 'small' | 'middle' | 'large'
  flex?: string | number
  tag?: string
}, {}, any, any, any, any, any, {}>

export declare const UcSpace: DefineComponent<{
  direction?: 'horizontal' | 'vertical'
  size?: 'large' | 'default' | 'small' | number | [number, number]
  align?: string
  wrap?: boolean
  fill?: boolean
}, {}, any, any, any, any, any, {}>

export declare const UcLink: DefineComponent<{
  type?: 'default' | 'primary' | 'success' | 'warning' | 'danger'
  href?: string
  target?: string
  disabled?: boolean
  underline?: 'always' | 'hover' | 'never'
}, {}, any, any, any, any, any, { click: (event: MouseEvent) => void }>

// ============ 滚动/分栏 ============

/** UcScrollbar 实例方法/属性（模板 ref 调用） */
export interface UcScrollbarInstance {
  /** 滚动条包裹容器 */
  wrapRef: HTMLElement | undefined
  /** 重新计算滚动条 */
  update(): void
  /** 触发滚动事件处理 */
  handleScroll(): void
  scrollTo(options?: number | { top?: number; left?: number; behavior?: ScrollBehavior }): void
  setScrollTop(value: number): void
  setScrollLeft(value: number): void
}

export declare const UcScrollbar: UcComponentWithExpose<{
  height?: string | number
  maxHeight?: string | number
  native?: boolean
  always?: boolean
  minSize?: number
  tag?: string
  distance?: number
  noresize?: boolean
  wrapStyle?: CSSProperties
  wrapClass?: string
  viewStyle?: CSSProperties
  viewClass?: string
}, UcScrollbarInstance, {
  scroll: (position: { scrollTop: number; scrollLeft: number }) => void
  // 类型层用 camelCase（EmitsToProps 生成 onEndReached）；运行时 emit('end-reached') 自动匹配
  endReached: (direction: 'top' | 'bottom' | 'left' | 'right') => void
}, 'wrapRef' | 'scrollTo' | 'setScrollTop' | 'setScrollLeft' | 'update' | 'handleScroll'>

export declare const UcSplitter: DefineComponent<{
  layout?: 'horizontal' | 'vertical'
  lazy?: boolean
}, {}, any, any, any, any, any, {
  resizeStart: (index: number, sizes: number[]) => void
  resize: (index: number, sizes: number[]) => void
  resizeEnd: (index: number, sizes: number[]) => void
  collapse: (index: number, side: 'start' | 'end', sizes: number[]) => void
}>

export declare const UcSplitterPanel: DefineComponent<{
  size?: string | number
  min?: string | number
  max?: string | number
  resizable?: boolean
  collapsible?: boolean | { start?: boolean; end?: boolean }
}, {}, any, any, any, any, any, { 'update:size': (size: number) => void }>

// ============ 上传/穿梭 ============

export interface UcUploadFile {
  name: string
  uid?: string | number
  status?: string
  url?: string
  [key: string]: any
}

export declare const UcUpload: DefineComponent<{
  modelValue?: UcUploadFile[]
  action?: string
  disabled?: boolean
  listType?: string
  text?: string
  autoUpload?: boolean
}, {}, any, any, any, any, any, Emits<{
  change: (file: UcUploadFile, fileList: UcUploadFile[]) => void
}>>

export interface UcTransferData {
  key: string
  label: string
  disabled?: boolean
}

export declare const UcTransfer: DefineComponent<{
  modelValue?: string[]
  data?: UcTransferData[]
  titles?: [string, string]
  filterable?: boolean
}, {}, any, any, any, any, any, Emits<{ change: (targetKeys: string[]) => void }>>
