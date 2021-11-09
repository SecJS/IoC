import { InternalServerException } from '@secjs/exceptions'
import { ContainerContract } from './contracts/ContainerContract'

export class Container implements ContainerContract {
  private services = new Map()

  getAll() {
    return this.services
  }

  get<D>(name: string, ...constructor: any): D {
    if (!this.services.has(name)) {
      throw new Error(`Dependency ${name} not found`)
    }

    const { isSingleton, Dependency } = this.services.get(name)

    if (!isSingleton) {
      return new Dependency(...constructor)
    }

    return Dependency
  }

  set(Dep: any, name?: string): void {
    this.services.set(name || Dep.name, {
      isSingleton: false,
      Dependency: Dep,
    })
  }

  delete(name: string): void {
    this.services.delete(name)
  }

  singleton(Dep: any, name?: string, ...constructor: any): void {
    let dependency

    if (typeof Dep === 'object' || Array.isArray(Dep)) {
      dependency = Dep

      if (!name)
        throw new InternalServerException(
          'Name cannot be empty on objects and arrays.',
        )
    } else {
      dependency = new Dep(...constructor)
    }

    this.services.set(name || Dep.name, {
      isSingleton: true,
      Dependency: dependency,
    })
  }
}
