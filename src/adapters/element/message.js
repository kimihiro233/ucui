import { ElMessage } from 'element-plus'

// 统一为服务式 API，与 antd 的 message 对象对齐
const UcMessage = {
  success(content, options = {}) {
    return ElMessage({ type: 'success', message: content, ...options })
  },
  error(content, options = {}) {
    return ElMessage({ type: 'error', message: content, ...options })
  },
  warning(content, options = {}) {
    return ElMessage({ type: 'warning', message: content, ...options })
  },
  info(content, options = {}) {
    return ElMessage({ type: 'info', message: content, ...options })
  },
}

export default UcMessage
