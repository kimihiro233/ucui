import { describe, it, expect } from 'vitest'
import UcNotification from '../element/notification'
import { notificationContract } from './notification.contract'

notificationContract('element', UcNotification)

describe('UcNotification element 专属映射', () => {
  it('success 后 document.body 插入 el-notification 且含标题', async () => {
    UcNotification.success('契约标题', '契约正文', { duration: 0 })
    await new Promise((r) => setTimeout(r, 50))
    // 契约用例残留的实例可能仍在 DOM 中，用 querySelectorAll 找本次的实例
    const els = [...document.querySelectorAll('.el-notification')]
    const el = els.find((n) => n.textContent.includes('契约标题'))
    expect(el, '应存在含契约标题的通知').toBeTruthy()
    expect(el.textContent).toContain('契约正文')
  })
})
