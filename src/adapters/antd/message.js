import { message } from 'ant-design-vue'

// 统一为服务式 API，与 element-plus 的 ElMessage 函数调用对齐
const UcMessage = {
  success(content, options = {}) {
    return message.success(content, options)
  },
  error(content, options = {}) {
    return message.error(content, options)
  },
  warning(content, options = {}) {
    return message.warning(content, options)
  },
  info(content, options = {}) {
    return message.info(content, options)
  },
}

export default UcMessage
