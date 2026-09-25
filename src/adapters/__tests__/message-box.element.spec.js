import { describe, it, expect } from 'vitest'
import UcMessageBox from '../element/message-box'
import { messageBoxContract } from './message-box.contract'

messageBoxContract('element-plus', UcMessageBox)

describe('UcMessageBox element-plus 专属映射', () => {
  it('confirm 底层调用 ElMessageBox.confirm', () => {
    expect(typeof UcMessageBox.confirm).toBe('function')
  })

  it('alert 底层调用 ElMessageBox.alert', () => {
    expect(typeof UcMessageBox.alert).toBe('function')
  })
})
