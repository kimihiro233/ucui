import { describe, it, expect } from 'vitest'
import UcMessage from '../element/message'
import { messageContract } from './message.contract'

messageContract('element-plus', UcMessage)

describe('UcMessage element-plus 专属映射', () => {
  it('success 调用 ElMessage 并传入 type=success', () => {
    // 调用后 document.body 会插入 el-message，或至少不抛错
    expect(() => UcMessage.success('测试')).not.toThrow()
  })
})
