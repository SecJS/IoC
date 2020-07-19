import { Namespace } from 'cls-hooked'

/**
 * IoC interface
 */
export interface IoC {
  container: IContainer
}

/**
 * Container interface
 */
export interface IContainer {
  $ns: Namespace
  $services: IService
  $singletons: any
  get(namespace: string): void
  bind(service: IService): void
  resolveDeps(service: IService): any
  factory(service: IService): any
  reset(): any
  [key: string]: any
}

/**
 * Definition Contact Interface
 */
export interface IDefinition {
  (...args: any): any
  new (...args: any): any
  name: string
  factory: any
  prototype?: any
  dependencies?: string[]
  options?: {
    singleton?: boolean
    scoped?: boolean
  }
}

/**
 * Service Contact Interface
 */
export interface IService {
  name: string
  definition: any
  dependencies?: string[]
  options?: object
}
