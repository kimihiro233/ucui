import { describe } from 'vitest'
import { calendarContract } from './calendar.contract'
import UcCalendar from '../element/calendar'

describe('UcCalendar [element]', () => {
  calendarContract('element', UcCalendar, { innerName: 'ElCalendar' })
})
