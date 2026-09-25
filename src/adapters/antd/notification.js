import { notification } from 'ant-design-vue'

// 统一为服务式 API：success/error/warning/info(title, content, options)
// antd 语义：message 是标题，description 是正文，与 element 的 title/message 对应
const UcNotification = {
  success(title, content, options = {}) {
    return notification.success({ message: title, description: content, ...options })
  },
  error(title, content, options = {}) {
    return notification.error({ message: title, description: content, ...options })
  },
  warning(title, content, options = {}) {
    return notification.warning({ message: title, description: content, ...options })
  },
  info(title, content, options = {}) {
    return notification.info({ message: title, description: content, ...options })
  },
}

export default UcNotification
