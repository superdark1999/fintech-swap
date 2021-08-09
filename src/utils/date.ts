const DAYS_TO_HARVEST = 7

export const isAbleToHarvest = (start: Date): boolean => {
  // return dayDiff(addDays(start, 7), new Date()) >= DAYS_TO_HARVEST
  return true
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(result.getDate() + days)
  return result
}

export const dayDiff = (date1: Date, date2: Date): number => {
  const diffInTime = date2.getTime() - date1.getTime()
  const diffInDays = diffInTime / (1000 * 3600 * 24)

  return diffInDays
}
