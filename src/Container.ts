import { createHash } from 'crypto'
import { ContainerContract } from './Contracts/ContainerContract'

export class Container implements ContainerContract {
  private services = new Map()

  get signature(): string {
    return createHash('md5').digest('hex')
  }

  get<D>(name: string): D {
    if (!this.services.has(name)) {
      throw new Error(`Dependency ${name} not found`)
    }

    return this.services.get(name)
  }

  set<D>(name: string, Dep: D): void {
    this.services.set(name, Dep)
  }
}

// TODO Put inside of a ServiceProvider
// global.container = new Container()

// global.use = function use<Dependency>(name: string): Dependency {
//   return container.get(name)
// }
