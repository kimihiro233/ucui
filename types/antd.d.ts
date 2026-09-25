// 子入口 ucui/antd：ant-design-vue 适配器全集（不含 core install）
// 组件类型与主入口一致，局部按需引入：
//   import { UcButton } from 'ucui/antd'
import type * as Components from './components'

export * from './components'

declare const _default: typeof Components
export default _default
