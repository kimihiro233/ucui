// 注册表：核心层唯一的状态，负责组件名 -> 实现的映射
// 注意：这里不允许 import 任何底层 UI 库

const registry = new Map()

export function register(name, component) {
  if (import.meta.env.DEV && registry.has(name)) {
    console.warn(`[UniUI] 组件 "${name}" 被重复注册，后者覆盖前者`)
  }
  registry.set(name, component)
}

export function resolve(name) {
  const component = registry.get(name)
  if (!component) {
    throw new Error(`[UniUI] 组件 "${name}" 未注册，请确认已通过 app.use(UniUI, { lib }) 安装适配器`)
  }
  return component
}

export function registered() {
  return [...registry.keys()]
}

// 仅供测试使用
export function _clear() {
  registry.clear()
}
