import { Modal } from 'ant-design-vue'

// 统一为服务式 API：confirm/alert(content, title?, options?) 返回 Promise
// resolve('confirm')；取消时 reject('cancel')
// antd 的 Modal.confirm/info 是回调式（onOk/onCancel），适配器内部包 Promise
// antd 无 alert 单按钮形态，按 type 分发到 Modal.info/success/warning/error
const alertTypes = ['success', 'warning', 'error', 'info']

const UcMessageBox = {
  confirm(content, title, options = {}) {
    const { type, confirmText, cancelText, ...rest } = options
    return new Promise((resolve, reject) => {
      Modal.confirm({
        title,
        content,
        okText: confirmText,
        cancelText,
        ...rest,
        onOk: () => resolve('confirm'),
        onCancel: () => reject('cancel'),
      })
    })
  },
  alert(content, title, options = {}) {
    const { type, confirmText, ...rest } = options
    const modalFn = alertTypes.includes(type) ? Modal[type] : Modal.info
    return new Promise((resolve) => {
      modalFn({
        title,
        content,
        okText: confirmText,
        ...rest,
        onOk: () => resolve('confirm'),
      })
    })
  },
  destroyAll() {
    Modal.destroyAll()
  },
}

export default UcMessageBox
