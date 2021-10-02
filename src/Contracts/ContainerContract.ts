export interface ContainerContract {
  get<D>(name: string): D
  set<D>(name: string, dependency: { new (): D }): void
  singleton<D>(name: string, dependency: { new (): D }): void
}
