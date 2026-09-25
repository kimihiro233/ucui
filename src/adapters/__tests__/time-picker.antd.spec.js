import { describe } from 'vitest'
import { timePickerContract } from './time-picker.contract'
import UcTimePicker from '../antd/time-picker'

describe('UcTimePicker [antd]', () => {
  timePickerContract('antd', UcTimePicker, { innerName: 'ATimePicker' })
})
