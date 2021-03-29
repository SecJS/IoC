# IoC Container 📦

> Very simple IoC container for NodeJS

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/SecJS/IoC?style=for-the-badge&logo=appveyor">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/SecJS/IoC?style=for-the-badge&logo=appveyor">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge&logo=appveyor">
</p>

The intention behind this repository is to always maintain a viable and simple IoC to use in simple `Frameworks` like `Fastify, Koa and Hapi`

<img src=".github/container.png" width="200px" align="right" hspace="30px" vspace="100px">

## Installation

You can install the IoC using;

```bash
yarn add @SecJS/IoC
```

## Usage

> Container register dependencies using Singleton pattern

```js
import { Container } from '@SecJS/IoC'
import { UserService } from 'app/Services/UserService'

const container = new Container()

container.set(UserService.name, new UserService())
const userService = container.get<UserService>(UserService.name)

console.log(userService.findAll())
```

---

## License

MIT © [João Lenon](https://github.com/SecJS/IoC/blob/master/LICENSE)
