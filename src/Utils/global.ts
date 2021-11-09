import { Container } from '../Container'

export {}

declare global {
  const Container: Container
}

const _global = global as any

_global.Container = new Container()
