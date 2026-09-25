import { describe, it, expect } from 'vitest'

// UcMessage 统一契约：所有适配器实现都必须满足这些行为
// 服务式 API，测试只验证方法存在和调用不抛错，不验证真实渲染
export function messageContract(name, UcMessage) {
  describe(`UcMessage 契约 [${name}]`, () => {
    it('暴露 success/error/warning/info 方法', () => {
      expect(typeof UcMessage.success).toBe('function')
      expect(typeof UcMessage.error).toBe('function')
      expect(typeof UcMessage.warning).toBe('function')
      expect(typeof UcMessage.info).toBe('function')
    })

    it('调用方法不抛错', () => {
      expect(() => UcMessage.success('ok')).not.toThrow()
      expect(() => UcMessage.error('ok')).not.toThrow()
      expect(() => UcMessage.warning('ok')).not.toThrow()
      expect(() => UcMessage.info('ok')).not.toThrow()
    })

    it('支持 options 参数', () => {
      expect(() => UcMessage.success('ok', { duration: 1000 })).not.toThrow()
    })
  })
}
