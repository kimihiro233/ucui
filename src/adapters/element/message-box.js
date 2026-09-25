import { ElMessageBox } from 'element-plus'

// 统一为服务式 API：confirm/alert(content, title?, options?) 返回 Promise
// resolve('confirm')；取消时 reject('cancel')（与 element 原生语义一致，antd 侧适配器包 Promise）
// options: { type?: 'success'|'warning'|'error'|'info', confirmText?, cancelText?, ...底层透传 }
function splitOptions(options) {
  const { type, confirmText, cancelText, ...rest } = options
  return {
    type,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    ...rest,
  }
}

const UcMessageBox = {
  confirm(content, title, options = {}) {
    return ElMessageBox.confirm(content, title, splitOptions(options))
  },
  alert(content, title, options = {}) {
    return ElMessageBox.alert(content, title, splitOptions(options))
  },
  destroyAll() {
    ElMessageBox.close()
  },
}

export default UcMessageBox
