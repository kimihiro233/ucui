import { register, registered, _clear } from './registry'
import elementAdapter from '../adapters/element'
import antdAdapter from '../adapters/antd'

// 注意：静态引入两套适配器，开发期无所谓；生产环境如需只打包一套，
// 可在业务项目的 vite.config 里用 alias 把本文件替换为只含目标适配器的版本
const adapters = {
  element: elementAdapter,
  antd: antdAdapter,
}

// 服务对象（如 UcMessage）不是组件：无 render/setup/template 的普通对象
function isComponent(entry) {
  return (
    typeof entry === 'function' ||
    entry.render ||
    entry.setup ||
    entry.template ||
    entry.__vccOpts // defineComponent 产物
  )
}

const UniUI = {
  /**
   * 安装统一组件库
   * @param {App} app
   * @param {{ lib: 'element' | 'antd' }} options 一个项目只使用一套底层库
   */
  install(app, options = {}) {
    applyLib(app, options.lib ?? 'element')
  },
}

/**
 * 将指定底层库的适配器注册到 app 上（可重复调用实现运行时切库，
 * 已渲染组件需配合子树 :key 重渲染才能拿到新实现）
 * @param {App} app
 * @param {'element' | 'antd'} lib
 */
function applyLib(app, lib) {
  const adapter = adapters[lib]
  if (!adapter) {
    throw new Error(`[UniUI] 不支持的底层库 "${lib}"，可选值：${Object.keys(adapters).join(', ')}`)
  }

  for (const [name, entry] of Object.entries(adapter)) {
    register(name, entry)
    if (isComponent(entry)) {
      app.component(name, entry)
    } else {
      // 服务式 API 挂到全局属性：UcMessage -> $message
      const propName = '$' + name.replace(/^Uc/, '').toLowerCase()
      app.config.globalProperties[propName] = entry
    }
  }
}

export { register, registered, _clear, applyLib }
export default UniUI
