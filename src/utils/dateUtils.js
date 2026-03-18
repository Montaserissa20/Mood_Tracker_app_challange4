function dayKeyToDate(dayKey) {
  const [year, month, day] = dayKey.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function getTodayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDayDifference(fromDayKey, toDayKey) {
  if (!fromDayKey || !toDayKey) {
    return 0;
  }

  const fromDate = dayKeyToDate(fromDayKey);
  const toDate = dayKeyToDate(toDayKey);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  return Math.round((toDate - fromDate) / millisecondsPerDay);
}
