import { describe, it, expect } from 'vitest'
import UcMessageBox from '../antd/message-box'
import { messageBoxContract } from './message-box.contract'

messageBoxContract('ant-design-vue', UcMessageBox)

describe('UcMessageBox ant-design-vue 专属映射', () => {
  it('confirm 底层调用 Modal.confirm', () => {
    expect(typeof UcMessageBox.confirm).toBe('function')
  })

  it('alert 底层调用 Modal.info（单按钮）', () => {
    expect(typeof UcMessageBox.alert).toBe('function')
  })
})
