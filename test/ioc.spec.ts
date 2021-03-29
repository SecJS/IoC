import { Container } from '../src/Container'

describe('\n IoC Container 😸', () => {
  it('should create an ioc container using @secjs/ioc module', () => {
    const container = new Container()

    expect(container.get).toBeTruthy()
    expect(container.set).toBeTruthy()
  })

  it('should be able to set singleton dependencies inside of ioc container', () => {
    const container = new Container()

    class Test {
      public value = 'test'
    }

    container.set<Test>('Test', new Test())

    const dependency = container.get<Test>('Test')

    expect(dependency.value).toBe('test')
  })

  it('should be able to call container and use function from global to handle dependencies', () => {
    class Test {
      public value = 'test'
    }

    container.set<Test>('Test', new Test())

    const dependency = use<Test>('Test')

    expect(dependency.value).toBe('test')
  })
})
