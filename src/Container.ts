import { ContainerContract } from './Contracts/ContainerContract'

export class Container implements ContainerContract {
  private services = new Map()

  getAll() {
    return this.services
  }

  get<D>(name: string): D {
    if (!this.services.has(name)) {
      throw new Error(`Dependency ${name} not found`)
    }

    const Dep = this.services.get(name)

    if (Dep instanceof Function) {
      return new Dep()
    }

    return Dep
  }

  set<D>(name: string, Dep: { new (): D }): void {
    this.services.set(name, Dep)
  }

  singleton<D>(name: string, Dep: { new (): D }): void {
    this.services.set(name, new Dep())
  }
}
