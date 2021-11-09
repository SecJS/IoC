import '../src/utils/global'

import { Dependency } from './stubs/Dependency'

describe('\n Global IoC Container 😸', () => {
  it('should be able to set a global container instance', () => {
    Container.set(Dependency)

    const dependency = Container.get<Dependency>(
      Dependency.name,
      'hello',
      'world',
    )
    expect(dependency.testValue).toBe('hello: world')
    dependency.changeValue('test2')

    const dependency2 = Container.get<Dependency>(
      Dependency.name,
      'hello',
      'nodejs',
    )
    expect(dependency2.testValue).toBe('hello: nodejs')
  })
})
