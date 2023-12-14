import type { TCountPoints } from "./types";

export function computeMathematicalExpectation(data: TCountPoints) {
  const totalCount = computeTotalCount(data)
  let mathExpectation = 0

  for (const entry of data) {
    const probability = entry.count / totalCount

    mathExpectation += entry.value * probability
  }

  return mathExpectation;
}

/**
 * plot it as is
 * 
 * X axis is value
 * 
 * Y axis is probability
 */
type TProbabilityPoint = {
  value: number,
  probability: number
}

export function computeEmpiricalFunction(data: TCountPoints) {
  const total = computeTotalCount(data)
  const points: TProbabilityPoint[] = []
  
  let currentCount = 0
  for (const {value, count} of data) {
    currentCount += count
    points.push({value, probability: currentCount / total})
  }

  return points
}

export function computeTotalCount(data: TCountPoints) {
  return data.reduce((total, {count}) => total + count, 0)
}

export function computeDispersion(statisticalSequence: TCountPoints) {
  const mathExpectation = computeMathematicalExpectation(statisticalSequence)
  
  const squaredValueSequence = statisticalSequence.map(({value, count}) => {return {value: (value ** 2), count}})
  const squaredValueMathExpectation = computeMathematicalExpectation(squaredValueSequence)
  
  return squaredValueMathExpectation - mathExpectation ** 2
}

export function computeFixedMeanSquare(dispersion: number, amount: number) {
  const coefficient = amount / (amount - 1)
  const squared = coefficient * dispersion;
  return Math.sqrt(squared)
}


