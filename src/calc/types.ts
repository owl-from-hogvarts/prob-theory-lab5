declare global {
  interface Array<T> {
    count(value: T): number;
  }
}

export type TCount = number
export type TCountPoint = {value: number, count: TCount}
export type TCountPoints = TCountPoint[]
