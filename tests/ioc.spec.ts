import { Container } from '../src/Container'

class Test {
  public testValue

  constructor() {
    this.testValue = 'test'
  }

  changeValue(value) {
    this.testValue = value
  }
}

describe('\n IoC Container 😸', () => {
  let container: Container

  beforeEach(() => {
    container = new Container()
  })

  it('should be able to set dependencies inside of ioc container', () => {
    container.set<Test>(Test.name, Test)

    const dependency = container.get<Test>(Test.name)
    expect(dependency.testValue).toBe('test')
    dependency.changeValue('test2')

    const dependency2 = container.get<Test>(Test.name)
    expect(dependency2.testValue).toBe('test')
  })

  it('should be able to set singleton dependencies inside of ioc container', () => {
    container.singleton<Test>(Test.name, Test)

    const dependency = container.get<Test>(Test.name)
    expect(dependency.testValue).toBe('test')
    dependency.changeValue('test2')

    const dependency2 = container.get<Test>(Test.name)
    expect(dependency2.testValue).toBe('test2')
  })
})
