import { describe, it, expect } from 'vitest'
import UcMessage from '../antd/message'
import { messageContract } from './message.contract'

messageContract('ant-design-vue', UcMessage)

describe('UcMessage ant-design-vue 专属映射', () => {
  it('success 调用 antd message.success', () => {
    expect(() => UcMessage.success('测试')).not.toThrow()
  })
})
