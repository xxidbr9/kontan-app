import 'react-native-get-random-values'
import { nanoid } from "nanoid"

export type LoggingType = 'expense' | 'income'

export type LogType = {
  id: string,
  createdAt: Date,
  type: LoggingType,
  amount: number,
  description: string,
}

export const mainLog: LogType[] = [
  {
    id: nanoid(),
    type: 'expense',
    amount: 10000,
    createdAt: new Date(2021, 4, 21, 10, 11),
    description: 'Jajan makanan',
  },
  {
    id: nanoid(),
    type: 'expense',
    amount: 10000,
    createdAt: new Date(2022, 4, 21, 10, 11),
    description: 'Jajan makanan',
  },
  {
    id: nanoid(),
    type: 'expense',
    amount: 10000,
    createdAt: new Date(2022, 4, 21, 10, 11),
    description: 'Jajan makanan',
  },
  {
    id: nanoid(),
    type: 'expense',
    amount: 10000,
    createdAt: new Date(2022, 5, 21, 10, 11),
    description: 'Jajan makanan',
  },
  {
    id: nanoid(),
    type: 'expense',
    amount: 10000,
    createdAt: new Date(2022, 6, 21, 10, 11),
    description: 'Jajan makanan',
  },
  {
    id: nanoid(),
    type: 'expense',
    amount: 10000,
    createdAt: new Date(2022, 6, 21, 10, 11),
    description: 'Jajan makanan',
  },
  {
    id: nanoid(),
    type: 'expense',
    amount: 10000,
    createdAt: new Date(2022, 6, 21, 21, 20),
    description: 'Jajan makanan',
  },
  {
    id: nanoid(),
    type: 'expense',
    amount: 20000,
    createdAt: new Date(2022, 6, 21, 12, 20),
    description: 'Jajan makanan',
  },
  {
    id: nanoid(),
    type: 'expense',
    amount: 20000,
    createdAt: new Date(2022, 6, 21, 12, 20),
    description: 'Jajan makanan',
  },
  {
    id: nanoid(),
    type: 'income',
    amount: 30000,
    createdAt: new Date(2022, 6, 21),
    description: 'Jajan makanan',
  },
  {
    id: nanoid(),
    type: 'income',
    amount: 30000,
    createdAt: new Date(2022, 6, 21),
    description: 'Duid masuk',
  },
  {
    id: nanoid(),
    type: 'income',
    amount: 30000,
    createdAt: new Date(2022, 7, 22),
    description: 'Tambahan uang',
  },
  {
    id: nanoid(),
    type: 'income',
    amount: 30000,
    createdAt: new Date(2022, 7, 27, 9, 22),
    description: 'Tambahan uang',
  },
  {
    id: nanoid(),
    type: 'income',
    amount: 30000,
    createdAt: new Date(2022, 7, 27, 9, 22),
    description: 'Tambahan uang',
  },
  {
    id: nanoid(),
    type: 'income',
    amount: 30000,
    createdAt: new Date(2022, 7, 12, 9, 22),
    description: 'Tambahan uang',
  },
  {
    id: nanoid(),
    type: 'income',
    amount: 30000,
    createdAt: new Date(2022, 7, 12, 9, 22),
    description: 'Tambahan uang',
  },
  {
    id: nanoid(),
    type: 'income',
    amount: 30000,
    createdAt: new Date(2022, 7, 18, 9, 22),
    description: 'Tambahan uang',
  },
]

export type GroupedLogType = {
  day: {
    dateNumber: number,
    sortMonth: string,
    longMonth: string,
    key: string,
    years: number
  },
  logs: LogType[],
}

export const toGroupLogs = (logs: LogType[]): GroupedLogType[] => {
  const groupedLogs: GroupedLogType[] = []
  const groupedLogsMap = new Map<string, GroupedLogType>()
  for (const log of logs) {
    const dateNumber = log.createdAt.getDate()
    const sortMonth = log.createdAt.toLocaleString('default', { month: 'short' }).toLowerCase()
    const newDate = new Date(Date.now())
    const isNowYear = newDate.getFullYear() === log.createdAt.getFullYear()
    const years = !isNowYear ? log.createdAt.getFullYear() : ""

    const newLongMonth = log.createdAt.toLocaleString('default', { month: 'long' }).toLowerCase()
    const longMonth = !isNowYear ? [newLongMonth, years].join(" ") : newLongMonth

    const key = `${dateNumber}-${sortMonth}-${years}`
    const groupedLog = groupedLogsMap.get(key)
    if (groupedLog) {
      groupedLog.logs.push(log)
    } else {
      groupedLogsMap.set(key, {
        day: {
          dateNumber,
          sortMonth,
          longMonth,
          key,
          years: years || 0,
        },
        logs: [log],
      })
    }
  }

  groupedLogsMap.forEach((value) => {
    groupedLogs.push(value)
  }
  )
  return groupedLogs
}

export type MonthGroupedLogType = {
  month: string,
  logs: GroupedLogType[],
}

export const toMonthGroupLogs = (logs: GroupedLogType[]): MonthGroupedLogType[] => {
  const groupedLogs: MonthGroupedLogType[] = []
  const groupedLogsMap = new Map<string, MonthGroupedLogType>()

  for (const log of logs) {
    const month = log.day.longMonth
    const groupedLog = groupedLogsMap.get(month)
    if (groupedLog) {
      groupedLog.logs.push(log)
    } else {
      groupedLogsMap.set(month, {
        month,
        logs: [log],
      })
    }
  }


  groupedLogsMap.forEach((value) => {
    groupedLogs.push(value)
  })

  return groupedLogs
}




export class LogHelper {
  public logs: LogType[]
  public groupLogs: GroupedLogType[]
  public inMonthLogs: MonthGroupedLogType[]

  constructor(logs: LogType[]) {
    const newLog = logs
    const newGroupLogs = toGroupLogs(newLog)
    const newInMonthLogs = toMonthGroupLogs(newGroupLogs)

    this.logs = newLog
    this.groupLogs = newGroupLogs
    this.inMonthLogs = newInMonthLogs
  }

  getListOfMonth(): { month: string, y: number }[] {
    const months = this.inMonthLogs.map((month) => month.month[0].toUpperCase() + month.month.slice(1))
    return months.map((month, index) => ({ month, y: 0 }))
  }
}