// element-plus 适配器共享的映射逻辑
export const sizeMap = {
  large: 'large',
  default: 'default',
  small: 'small',
}

export const sizePropDef = {
  type: String,
  default: 'default',
  validator: (v) => ['large', 'default', 'small'].includes(v),
}
