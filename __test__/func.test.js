/* 
  常用function方法测试
*/

const { oApply, oCall, oBind, oCurry, oDebounce } = require('../dist/index')

describe('测试function的call方法', () => {
  test('常规测试', () => {
    function fn(msg) {
      return `${this.name}: ${msg}`
    }
    const obj = { name: 'jacky' }
    expect(oCall(fn, obj, 'hello world')).toBe('jacky: hello world')
  })
  test('常规测试2', () => {
    function fn(msg, info) {
      return `${this.name}:${msg},${info}`
    }
    const obj = { name: 'jacky' }
    expect(oCall(fn, obj, 'hello', 'world')).toBe('jacky:hello,world')
  })
  test('常规测试3', () => {
    const fn = (msg, info) => {
      return `${this.name}:${msg},${info}`
    }
    const obj = { name: 'jacky' }
    this.name = 'jc'
    expect(oCall(fn, obj, 'hello', 'world')).toBe('jc:hello,world')
  })
})

describe('测试function的apply方法', () => {
  test('常规测试', () => {
    function fn(msg) {
      return `${this.name}: ${msg}`
    }
    const obj = { name: 'jacky' }
    expect(oApply(fn, obj, ['hello world'])).toBe('jacky: hello world')
  })
  test('常规测试2', () => {
    function fn(msg, info) {
      return `${this.name}:${msg},${info}`
    }
    const obj = { name: 'jacky' }
    expect(oApply(fn, obj, ['hello', 'world'])).toBe('jacky:hello,world')
  })
  test('常规测试3', () => {
    const fn = (msg, info) => {
      return `${this.name}:${msg},${info}`
    }
    const obj = { name: 'jacky' }
    this.name = 'jc'
    expect(oApply(fn, obj, ['hello', 'world'])).toBe('jc:hello,world')
  })
})

describe('测试function的bind方法', () => {
  const module = {
    x: 42,
    getX: function (num) {
      return this.x + num
    },
  }
  const unboundGetX = module.getX
  test('常规测试', () => {
    const f1 = oBind(unboundGetX, { x: 1 })
    expect(f1(1)).toBe(2)
  })
  test('常规测试2', () => {
    const f1 = oBind(unboundGetX, { x: 1 }, 2)
    expect(f1()).toBe(3)
  })
  test('常规测试3', () => {
    const f1 = oBind(unboundGetX, { x: 1 }, 2)
    expect(f1(3)).toBe(3)
  })
})

describe('测试柯里化', () => {
  test('常规测试', () => {
    const add = (x, y) => x + y
    const fn = oCurry(add)
    expect(fn(1, 2)).toBe(3)
  })
  test('常规测试2', () => {
    const add = (x, y) => x + y
    const fn = oCurry(add)
    expect(fn(1)(2, 3)).toBe(3)
  })
  test('常规测试3', () => {
    const add = (x, y) => x + y
    const fn = oCurry(add, 1, 100)
    expect(fn(1)).toBe(101)
  })
  test('常规测试4', () => {
    const add = (x, y) => x + y
    const fn = oCurry(add, 1)
    expect(fn(100, 200)).toBe(101)
  })
})

describe('测试防抖函数', () => {})
