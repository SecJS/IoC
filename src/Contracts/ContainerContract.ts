export interface ContainerContract {
  get<D>(name: string, ...constructor: any): D
  getAll(): Map<string, any>
  set(dependency: any, name?: string): void
  singleton(dependency: any, name?: string, ...constructor: any): void
}
