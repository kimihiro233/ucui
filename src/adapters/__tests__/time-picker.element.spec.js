import { describe } from 'vitest'
import { timePickerContract } from './time-picker.contract'
import UcTimePicker from '../element/time-picker'

describe('UcTimePicker [element]', () => {
  timePickerContract('element', UcTimePicker, { innerName: 'ElTimePicker' })
})
