// ant-design-vue 适配器共享的映射逻辑
export const sizeMap = {
  large: 'large',
  default: 'middle', // antd 的中间档叫 middle
  small: 'small',
}

export const sizePropDef = {
  type: String,
  default: 'default',
  validator: (v) => ['large', 'default', 'small'].includes(v),
}
