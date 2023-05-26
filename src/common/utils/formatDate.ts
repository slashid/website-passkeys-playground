const isDateValid = (date: Date) =>
  date instanceof Date && !isNaN(date.valueOf())

export const formatDate = (date: string) => {
  // "/" gives a day behind somehow
  const data = new Date(date.replace(/\//g, '-'))

  if (isDateValid(data)) {
    const day = data.getUTCDate()
    const month = data.toLocaleString('en', { month: 'short' })
    const year = data.getFullYear()

    return `${day} ${month}, ${year}`
  } else {
    throw new Error(`Date "${date}", is not valid`)
  }
}
