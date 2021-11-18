# IoC Container 📦

> Very simple IoC container for NodeJS

[![GitHub followers](https://img.shields.io/github/followers/jlenon7.svg?style=social&label=Follow&maxAge=2592000)](https://github.com/jlenon7?tab=followers)
[![GitHub stars](https://img.shields.io/github/stars/secjs/ioc.svg?style=social&label=Star&maxAge=2592000)](https://github.com/secjs/ioc/stargazers/)

<p>
    <a href="https://www.buymeacoffee.com/secjs" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>
</p>

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/SecJS/IoC?style=for-the-badge&logo=appveyor">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/SecJS/IoC?style=for-the-badge&logo=appveyor">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge&logo=appveyor">

  <img alt="Commitizen" src="https://img.shields.io/badge/commitizen-friendly-brightgreen?style=for-the-badge&logo=appveyor">
</p>

The intention behind this repository is to always maintain a viable and simple IoC to use in any type of `NodeJS` applications, with or without `Frameworks`

<img src=".github/container.png" width="200px" align="right" hspace="30px" vspace="100px">

## Installation

```bash
npm install @secjs/ioc
```

## Usage

### Set

> Container can register dependencies for you, every container.get will create a new instance for UserService.

```js
import { Container } from '@SecJS/IoC'
import { UserService } from 'app/Services/UserService'

const container = new Container()

container.set(UserService)
const userService = container.get<UserService>('UserService', 'props', 'to', 'UserService Constructor here')

console.log(userService.findAll())
```

### Singleton

> Container can register singleton dependencies, when singleton container.get will return the same UserService instance all time.

```js
import { Container } from '@SecJS/IoC'
import { UserService } from 'app/Services/UserService'

const container = new Container()

container.singleton(UserService, 'props', 'to', 'UserService Constructor here')
const userService = container.get<UserService>('UserService')

console.log(userService.findAll())
```

> Singleton can register static objects and arrays too, but for arrays and objects the name is required:

```js
container.singleton([], 'myArray')
container.singleton({}, 'myObject')

console.log(container.get('myArray')) // []
console.log(container.get('myObject')) // {}
```

---

## License

Made with 🖤 by [jlenon7](https://github.com/jlenon7) :wave:
