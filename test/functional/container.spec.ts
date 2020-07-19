import { ioc, Container } from '../../src'
import { Assert, test } from '../stub/types'

class TestService {
  private parent: any

  constructor(parent: any) {
    this.parent = parent
  }

  getFoo() {
    return this.parent.foo
  }
}

test.group('IoC Container', () => {
  test('it should use proxy', async (assert: Assert) => {
    Container.create()

    ioc.container.bind({
      name: 'foo',
      definition: 'bar',
    })

    assert.equal(ioc.container.foo, ioc.container.get('foo'))
  })

  test('it should create new container from an array of definitions', async (assert: Assert) => {
    const definitions = [
      {
        name: 'parent',
        factory: () => {
          return {
            foo: 'bar',
          }
        },
      },
      {
        name: 'child',
        factory: TestService,
        dependencies: ['parent'],
      },
    ]

    Container.create(definitions)

    assert.equal(ioc.container.parent.foo, 'bar')
    assert.equal(ioc.container.child.getFoo(), 'bar')

    ioc.container.parent.foo = 'bar2'

    assert.equal(ioc.container.parent.foo, 'bar2')
    assert.equal(ioc.container.child.getFoo(), 'bar2')
  })
})
