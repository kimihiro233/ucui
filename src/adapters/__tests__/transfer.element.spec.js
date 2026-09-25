import { describe } from 'vitest'
import { transferContract } from './transfer.contract'
import UcTransfer from '../element/transfer'

describe('UcTransfer [element]', () => {
  transferContract('element', UcTransfer, { innerName: 'ElTransfer' })
})
