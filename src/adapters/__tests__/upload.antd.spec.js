import { describe } from 'vitest'
import { uploadContract } from './upload.contract'
import UcUpload from '../antd/upload'

describe('UcUpload [antd]', () => {
  uploadContract('antd', UcUpload, { innerName: 'AUpload' })
})
