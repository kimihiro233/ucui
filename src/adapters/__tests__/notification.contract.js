import { describe, it, expect } from 'vitest'

// UcNotification 统一契约：服务式 API，与 UcMessage 同样只验证方法存在和调用不抛错
// 统一签名：success/error/warning/info(title, content, options)
export function notificationContract(name, UcNotification) {
  describe(`UcNotification 契约 [${name}]`, () => {
    it('暴露 success/error/warning/info 方法', () => {
      expect(typeof UcNotification.success).toBe('function')
      expect(typeof UcNotification.error).toBe('function')
      expect(typeof UcNotification.warning).toBe('function')
      expect(typeof UcNotification.info).toBe('function')
    })

    it('调用方法不抛错（title + content）', () => {
      expect(() => UcNotification.success('标题', '正文')).not.toThrow()
      expect(() => UcNotification.error('标题', '正文')).not.toThrow()
      expect(() => UcNotification.warning('标题', '正文')).not.toThrow()
      expect(() => UcNotification.info('标题', '正文')).not.toThrow()
    })

    it('支持 options 参数', () => {
      expect(() => UcNotification.success('标题', '正文', { duration: 1 })).not.toThrow()
    })

    it('content 可省略', () => {
      expect(() => UcNotification.info('仅标题')).not.toThrow()
    })
  })
}
