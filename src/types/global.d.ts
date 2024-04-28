declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type Lazy<T> = () => Promise<T>
