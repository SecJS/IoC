export interface DependencyContract<T> {
  new (...args: any): T
}
