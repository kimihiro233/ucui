import { describe, it, expect } from 'vitest'

// UcMessageBox 统一契约：服务式 API
// confirm/alert(content, title?, options?) 返回 Promise
// resolve('confirm') / reject('cancel')
// 统一 options: { type, confirmText, cancelText, ...底层透传 }

export function messageBoxContract(libName, UcMessageBox) {
  describe(`UcMessageBox 契约 [${libName}]`, () => {
    it('暴露 confirm/alert/destroyAll 方法', () => {
      expect(typeof UcMessageBox.confirm).toBe('function')
      expect(typeof UcMessageBox.alert).toBe('function')
      expect(typeof UcMessageBox.destroyAll).toBe('function')
    })

    it('confirm 返回 Promise', () => {
      const p = UcMessageBox.confirm('内容', '标题')
      expect(p).toBeInstanceOf(Promise)
      p.catch(() => {}) // 避免 unhandled rejection
    })

    it('alert 返回 Promise', () => {
      const p = UcMessageBox.alert('内容', '标题')
      expect(p).toBeInstanceOf(Promise)
      p.catch(() => {})
    })

    it('confirm 支持 options 参数不抛错', () => {
      expect(() => {
        const p = UcMessageBox.confirm('内容', '标题', { confirmText: '确定', cancelText: '取消' })
        p.catch(() => {})
      }).not.toThrow()
    })

    it('alert 支持 type/options 参数不抛错', () => {
      expect(() => {
        const p = UcMessageBox.alert('内容', '标题', { type: 'success', confirmText: '知道了' })
        p.catch(() => {})
      }).not.toThrow()
    })
  })
}
