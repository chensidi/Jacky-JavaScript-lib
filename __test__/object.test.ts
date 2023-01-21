const { oAssign } = require('../dist/index')

describe('测试object中的assign方法', () => {
  test('常规测试', () => {
    const obj = {}
    const res = oAssign(obj, { name: 'jacky' }, { age: 20 })
    expect(obj).toBe(res)
    expect(res).toEqual({
      name: 'jacky',
      age: 20,
    })
  })
  test('测试原型链上的属性是否会被拷贝', () => {
    const obj = { city: 'USA' }
    const test = Object.create({name: 'ts'})
    test.age = 20
    const res = oAssign(obj, test)
    expect(obj).toBe(res)
    expect(res).toEqual({
      city: 'USA',
      age: 20,
    })
  })
  test('测试symbol属性是否会被拷贝', () => {
    const obj = { city: 'USA' }
    const test = Object.create({name: 'ts'})
    test[Symbol(1)] = 100
    const res = oAssign(obj, test)
    expect(obj).toBe(res)
    console.log(res)
    expect(JSON.stringify(res)).toStrictEqual(JSON.stringify({
      city: 'USA',
      [Symbol(1)]: 100
    }))
  })
})
