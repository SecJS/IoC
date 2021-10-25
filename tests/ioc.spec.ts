import { Container } from '../src/Container'
import { Singleton } from './stubs/Singleton'
import { Dependency } from './stubs/Dependency'

describe('\n IoC Container 😸', () => {
  let container: Container

  beforeEach(() => {
    container = new Container()
  })

  it('should be able to set dependencies inside of ioc container', () => {
    container.set(Dependency)

    const dependency = container.get<Dependency>(
      Dependency.name,
      'hello',
      'world',
    )
    expect(dependency.testValue).toBe('hello: world')
    dependency.changeValue('test2')

    const dependency2 = container.get<Dependency>(
      Dependency.name,
      'hello',
      'nodejs',
    )
    expect(dependency2.testValue).toBe('hello: nodejs')
  })

  it('should be able to set singleton dependencies inside of ioc container', () => {
    container.singleton(Singleton, 'Singleton', 'hello', 'world')

    const dependency = container.get<Singleton>(Singleton.name)
    expect(dependency.testValue).toBe('hello: world')
    dependency.changeValue('test2')

    const dependency2 = container.get<Singleton>(Singleton.name)
    expect(dependency2.testValue).toBe('test2')
  })

  it('should throw and error when trying to set an object/array dependency without name', () => {
    try {
      container.singleton({ test: 'hello' })
    } catch (error) {
      expect(error.status).toBe(500)
      expect(error.name).toBe('InternalServerException')
      expect(error.content).toBe('Name cannot be empty on objects and arrays.')
    }

    try {
      container.singleton(['hello'])
    } catch (error) {
      expect(error.status).toBe(500)
      expect(error.name).toBe('InternalServerException')
      expect(error.content).toBe('Name cannot be empty on objects and arrays.')
    }
  })

  it('should be able to set objects/arrays inside the container', () => {
    container.singleton({ hello: 'configs' }, 'configs')
    container.singleton(['TestService'], 'services')

    const configs = container.get('configs')
    expect(configs).toStrictEqual({ hello: 'configs' })

    const services = container.get('services')
    expect(services).toStrictEqual(['TestService'])
  })
})
