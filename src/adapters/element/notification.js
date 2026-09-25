import { ElNotification } from 'element-plus'

// 统一为服务式 API：success/error/warning/info(title, content, options)
// element 语义：title 是标题，message 是正文
const UcNotification = {
  success(title, content, options = {}) {
    return ElNotification({ type: 'success', title, message: content, ...options })
  },
  error(title, content, options = {}) {
    return ElNotification({ type: 'error', title, message: content, ...options })
  },
  warning(title, content, options = {}) {
    return ElNotification({ type: 'warning', title, message: content, ...options })
  },
  info(title, content, options = {}) {
    return ElNotification({ type: 'info', title, message: content, ...options })
  },
}

export default UcNotification
