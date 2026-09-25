import { describe } from 'vitest'
import { calendarContract } from './calendar.contract'
import UcCalendar from '../antd/calendar'

describe('UcCalendar [antd]', () => {
  calendarContract('antd', UcCalendar, { innerName: 'ACalendar' })
})
