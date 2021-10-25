export class Dependency {
  public testValue

  constructor(value1: string, value2: string) {
    this.testValue = `${value1}: ${value2}`
  }

  changeValue(value) {
    this.testValue = value
  }
}
