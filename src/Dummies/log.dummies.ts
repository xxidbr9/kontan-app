
export type LoggingType = 'expanse' | 'income'

export type LogType = {
  id: number,
  date: Date,
  type: LoggingType,
  amount: number,
  description: string,
}

export const mainLog: LogType[] = [
  {
    id: 1,
    type: 'expanse',
    amount: 10000,
    date: new Date(2020, 5, 21, 10, 0),
    description: 'Jajan makanan',
  },
  {
    id: 2,
    type: 'expanse',
    amount: 20000,
    date: new Date(2020, 5, 21, 10, 0),
    description: 'Jajan makanan',
  },
  {
    id: 3,
    type: 'income',
    amount: 30000,
    date: new Date(2020, 5, 21, 10, 0),
    description: 'Jajan makanan',
  },
  {
    id: 4,
    type: 'income',
    amount: 30000,
    date: new Date(2020, 5, 21, 10, 0),
    description: 'Duid masuk',
  },
  {
    id: 4,
    type: 'expanse',
    amount: 30000,
    date: new Date(2020, 5, 22, 10, 0),
    description: 'Jajan makanan',
  },
  {
    id: 5,
    type: 'income',
    amount: 30000,
    date: new Date(2020, 5, 22, 10, 0),
    description: 'Tambahan uang',
  },
]

export type GroupedLogType = {
  day: {
    dateNumber: number,
    month: string,
  },
  logs: LogType[],
}

export const toGroupLogs = (logs: LogType[]): GroupedLogType[] => {
  const groupedLogs: GroupedLogType[] = []
  const groupedLogsMap = new Map<number, GroupedLogType>()
  for (const log of logs) {
    const dateNumber = log.date.getDate()
    const month = log.date.toLocaleString('default', { month: 'short' }).toLowerCase()
    const groupedLog = groupedLogsMap.get(dateNumber)
    if (groupedLog) {
      groupedLog.logs.push(log)
    } else {
      groupedLogsMap.set(dateNumber, {
        day: {
          dateNumber,
          month,
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
