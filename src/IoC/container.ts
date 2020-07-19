import { IService, IDefinition, IContainer, IoC } from '../Contracts'
import { Namespace, createNamespace } from 'cls-hooked'
import { uuid } from 'uuidv4'

export let ioc: IoC

export class Container implements IContainer {
  public $ns: Namespace
  public $services: any
  public $singletons: any

  constructor(namespace: Namespace) {
    this.$ns = namespace
    this.$services = new Map()
    this.$singletons = new Map()

    return new Proxy(this, Container.proxy)
  }

  static get proxy(): any {
    return {
      get(instance: any, property: any): any {
        if (instance.$services.has(property)) {
          return instance.get(property)
        }

        return instance[property]
      },
    }
  }

  static create(definitions?: any, namespace?: any): any {
    namespace = namespace || createNamespace(uuid())

    const container = new Container(namespace)
    ioc = {
      container,
    }

    if (definitions) {
      definitions.forEach((definition: IDefinition) => {
        const { name, factory, dependencies, options } = definition

        ioc.container.bind({ name, definition: factory, dependencies, options })
      })
    }

    return ioc.container.$services
  }

  public bind(service: IService): void {
    let { name, definition, dependencies, options } = service

    options = Object.assign(
      {
        singleton: true,
        scoped: false,
      },
      options,
    )

    this.$services.set(name, {
      definition,
      dependencies: dependencies || undefined,
      ...options,
    })

    // ioc.container.$services.set(name, {
    //   definition,
    //   dependencies,
    //   ...options,
    // })
  }

  public get(name: string): any {
    const service = this.$services.get(name)

    if (!service) {
      throw new Error(`Service ${name} has not been registered`)
    }

    if (typeof service.definition === 'function') {
      if (service.singleton) {
        let instance

        if (service.scoped && this.$ns.active) {
          instance = this.$ns.get(name)

          if (!instance) {
            instance = this.factory(service)
            this.$ns.set(name, instance)
          }
        } else {
          instance = this.$singletons.get(name)

          if (!instance) {
            instance = this.factory(service)
            this.$singletons.set(name, instance)
          }
        }

        return instance
      }

      return this.factory(service)
    }

    return service.definition
  }

  public resolveDeps(service: IService): any {
    let deps = []

    if (service.dependencies) {
      deps = service.dependencies.map((dep: any) => {
        return this.get(dep)
      })
    }

    return deps
  }

  public factory(service: IService): any {
    const Constructor = service.definition

    if (
      typeof Constructor.prototype !== 'undefined' &&
      Constructor.prototype.constructor
    ) {
      return new Constructor(...this.resolveDeps(service))
    }

    return Constructor(...this.resolveDeps(service))
  }

  public reset(): any {
    this.$singletons = new Map()
  }
}
