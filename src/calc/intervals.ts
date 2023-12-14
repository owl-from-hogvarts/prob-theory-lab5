
function computeRange(data: number[]) {
  const min = Math.min(...data)
  const max = Math.max(...data)

  return max - min
}


function computeIntervalWidth(amountOfPoints: number, range: number) {
  const m = 1 + Math.log2(amountOfPoints)

  return range / m
}

type TRange = {
  start: number,
  end: number
}

export type TInterval = {
  range: TRange
  value: number
}

function amountOfIntervals(range: number, intervalWidth: number) {
  return Math.ceil(range / intervalWidth)
}

export function computeIntervals(data: number[]) {
  const range = computeRange(data)
  // const totalIntervals = 9
  // const intervalWidth = (Math.max(...data) - Math.min(...data)) / totalIntervals
  const intervalWidth = computeIntervalWidth(data.length, range)
  const intervalHalfWidth = intervalWidth / 2
  const totalIntervals = amountOfIntervals(range, intervalWidth)

  const intervals: TInterval[] = []
  let lastIntervalEnd = Math.min(...data) - intervalHalfWidth;
  for (let i = 0; i < totalIntervals; i++) {
    const range: TRange = {
      start: lastIntervalEnd,
      end: lastIntervalEnd + intervalWidth
    }

    lastIntervalEnd = range.end
    
    intervals.push({
      range,
      value: countInInterval(data, range) / intervalWidth
    })
  }

  return intervals
} 

function countInInterval(data: number[], {start, end}: TRange) {
  let count = 0
  
  for (const point of data) {
    // one end exclusive to not account same point twice
    if (start <= point && point < end ) {
      count += 1
    }
  }

  return count
}

