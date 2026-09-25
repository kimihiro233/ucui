import { describe } from 'vitest'
import { uploadContract } from './upload.contract'
import UcUpload from '../element/upload'

describe('UcUpload [element]', () => {
  uploadContract('element', UcUpload, { innerName: 'ElUpload' })
})
