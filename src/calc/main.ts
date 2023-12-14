import { computeDispersion, computeEmpiricalFunction, computeMathematicalExpectation, computeTotalCount } from "./calculations";
import { TCountPoints } from "./types";

Array.prototype.count = function count<T>(this: Iterable<T>, value: T) {
  let count = 0;
  
  for (const currentValue of this) {
    count += +(currentValue === value);
  }

  return count
}

// BODY

export const input = [-0.45, 1.42, 0.52, 0.66, -1.63, -1.7, -0.42, 0.17, -1.18, 0.14, 1.62, -1.71, 0.43, -0.18, 1.42, 0.69, -0.55, -0.7, -1.51, -0.68];
// import _input from "./data"

// export const input = _input

// slice to create a copy
export const variadicSeries = input.slice().sort((a, b) => a - b)

export const statisticalSequence = computeStatisticalSequence(variadicSeries)

export const min = statisticalSequence[0].value
export const max = statisticalSequence.at(-1)!.value
export const range = max - min


export const mathExpectation = computeMathematicalExpectation(statisticalSequence);

export const dispersion = computeDispersion(statisticalSequence)
export const meanSquare = Math.sqrt(dispersion)

const counts = statisticalSequence.map(({count}) => count)

export const maxCount =  Math.max(...counts)
export const minCount = Math.min(...counts)

export const points = computeEmpiricalFunction(statisticalSequence)

function computeStatisticalSequence(variadicSeries: number[]) {
  // take only distinct values to not call count on same value multiple times
  const valuesSet = new Set(variadicSeries)
  const statisticalSeries: TCountPoints = []
  for (const value of valuesSet) {
    const count = variadicSeries.count(value)
  
    statisticalSeries.push({value, count})
  }
  
  statisticalSeries.sort(({value: a}, {value: b}) => a - b)

  return statisticalSeries
}

