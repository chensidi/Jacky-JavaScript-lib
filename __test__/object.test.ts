const { oAssign, oFreeze, oKeys, oValues } = require('../dist/index')

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
    const test = Object.create({ name: 'ts' })
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
    const test = Object.create({ name: 'ts' })
    test[Symbol(1)] = 100
    const res = oAssign(obj, test)
    expect(obj).toBe(res)
    console.log(res)
    expect(JSON.stringify(res)).toStrictEqual(
      JSON.stringify({
        city: 'USA',
        [Symbol(1)]: 100,
      })
    )
  })
})

describe('测试object中freeze方法', () => {
  test('常规测试', () => {
    const obj = {
      prop: 42,
      info: {
        a: 1,
      },
      msg: {
        num: 100,
      }
    }
    oFreeze(obj)
    try {
      obj.msg.num = 1000
      obj.prop = 20
      obj.info = {
        a: 100
      }
    } catch {
      expect(obj.prop).toBe(42)
      expect(obj.info).toEqual({
        a: 1
      })
      expect(obj.msg.num).toBe(1000)
    }
  })
})

describe('测试object中keys方法', () => { 
  test('常规测试', () => {
    const obj = {
      name: 'jacky',
      age: 100,
      info: {
        child: [1,2,3]
      },
      [Symbol(1)]: 1,
      other: 123,
    }
    Object.defineProperty(obj, 'other', {
      enumerable: false,
    })
    const keys = oKeys(obj)
    expect(keys).toEqual(['name', 'age', 'info'])
  })  
})

describe('测试object中values方法', () => { 
  test('常规测试', () => {
    const obj = {
      name: 'jacky',
      age: 100,
      info: {
        child: [1,2,3]
      },
      [Symbol(1)]: 1,
      other: 123,
    }
    Object.defineProperty(obj, 'other', {
      enumerable: false,
    })
    const keys = oValues(obj)
    expect(keys).toEqual(['jacky', 100, {
      child: [1,2,3]
    }])
  })  
})