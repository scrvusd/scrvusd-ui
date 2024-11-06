import { formatUnits } from 'viem'

export const getString = (data: string | number, nbDecimals = 2) => {
  if (typeof data === 'string') {
    return data
  }
  return data ? Number(data).toFixed(nbDecimals) : 0
}

export const getFixedNumber = (amount: string, reduce = false) => {
  const earningsNumber = reduce ? Number(formatUnits(BigInt(amount), 18)) : Number(amount)
  if (earningsNumber > 0 && earningsNumber < 1) {
    const indexNotZero = earningsNumber.toString().match('[1-9]')
    return indexNotZero && indexNotZero.index ? indexNotZero.index - 2 + 4 : 4
  }
  if (earningsNumber >= 1 && earningsNumber < 100) {
    return 2
  }
  if (earningsNumber >= 100 && earningsNumber < 1000) {
    return 2
  }
  return 0
}

export const fixed = (nb: string, decimals?: number) => {
  const fixedTo = decimals ? decimals : getFixedNumber(nb)
  return Number(nb).toLocaleString('en-US', {
    minimumFractionDigits: fixedTo,
    maximumFractionDigits: fixedTo,
  })
}

export const fixedNb = (nb: number, decimals: number) => {
  return nb.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export const getUsdFormat = (number: string | number) => {
  if (typeof number === 'string') {
    number = Number(number)
  }

  if (number > 1000000000) {
    return { prefix: '$', value: Math.round((number / 1000000000) * 100) / 100, suffix: 'B' }
  } else if (number > 1000000) {
    return { prefix: '$', value: Math.round((number / 1000000) * 100) / 100, suffix: 'M' }
  } else if (number > 1000) {
    return { prefix: '$', value: Math.round((number / 1000) * 100) / 100, suffix: 'k' }
  } else {
    return { prefix: '$', value: Math.round(number), suffix: '' }
  }
}

export const formatUsd = (number: string | number) => {
  if (typeof number === 'string') {
    number = Number(number)
  }

  if (number > 1000000000) {
    return getString(number / 1000000000, 2) + 'B'
  } else if (number > 1000000) {
    return getString(number / 1000000, 2) + 'M'
  } else if (number > 1000) {
    return getString(number / 1000, 2) + 'k'
  } else {
    return fixed(number.toString())
  }
}

export const withTwoDec = (num: number) => {
  return fixedNb(num, 2)
}

export const numberYearsToString = (num: number) => {
  const split = num.toString().split('.')
  const parsed = { years: 0, months: 0, days: 0 }
  parsed.years = Number(split[0])

  if (split.length === 2) {
    const monthsWithDecimal = Number(`${0}.${split[1]}`) * 12
    const monthsSplit = monthsWithDecimal.toString().split('.')
    parsed.months = Number(monthsSplit[0])
    return `${parsed.years} years, ${parsed.months} months`
  }
  return `${parsed.years} years`
}

export const averageLockTrans = (num: number, t: (str: string, conf?: any) => string) => {
  const split = num.toString().split('.')
  const parsed = { years: 0, months: 0, days: 0 }
  parsed.years = Number(split[0])

  if (split.length === 2) {
    const monthsWithDecimal = Number(`${0}.${split[1]}`) * 12
    const monthsSplit = monthsWithDecimal.toString().split('.')
    parsed.months = Number(monthsSplit[0])
    return t('y years, m months average lock', { y: parsed.years, m: parsed.months, ns: 'sdt' })
  }
  return t('y years average lock', { y: parsed.years, ns: 'sdt' })
}
