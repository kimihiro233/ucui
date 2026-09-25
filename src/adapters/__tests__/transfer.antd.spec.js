import { describe } from 'vitest'
import { transferContract } from './transfer.contract'
import UcTransfer from '../antd/transfer'

describe('UcTransfer [antd]', () => {
  transferContract('antd', UcTransfer, { innerName: 'ATransfer' })
})
