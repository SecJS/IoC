export interface ContainerContract {
  signature: string
  get<Dependency>(name: string): Dependency
  set<Dependency>(name: string, dependency: Dependency): void
}
