const {
  oStringIterator,
  oStringGenerator,
  oStrAt,
  oStrCharAt,
  oStrStartsWith,
  oStrEndsWith,
  oStrIncludes,
  oStrIndexOf,
} = require('../dist/index')

describe('测试string的迭代器', () => {
  test('常规测试', () => {
    const str = '123'
    const arr: string[] = []
    const itr = oStringIterator(str)
    for (let item of itr) {
      arr.push(item)
    }
    expect(arr).toEqual(['1', '2', '3'])
  })
  test('常规测试2', () => {
    const str = '123'
    const arr: string[] = []
    const itr = oStringGenerator(str)
    for (let item of itr) {
      arr.push(item)
    }
    expect(arr).toEqual(['1', '2', '3'])
  })
})

describe('测试string的at方法', () => {
  test('常规测试', () => {
    expect(oStrAt('Jacky Cheung', 2)).toBe('c')
  })
  test('测试负数索引', () => {
    expect(oStrAt('Jacky Cheung', -2)).toBe('n')
  })
  test('测试负数索引越界', () => {
    expect(oStrAt('Jacky Cheung', -20)).toBe(undefined)
  })
  test('测试索引越界', () => {
    expect(oStrAt('Jacky Cheung', 20)).toBe(undefined)
  })
  test('测试非数字索引', () => {
    expect(oStrAt('Jacky Cheung', true)).toBe('a')
  })
})

describe('测试string的charAt方法', () => {
  test('常规测试', () => {
    expect(
      oStrCharAt('Jacky Cheung', 2)
    ).toBe('c')
  })
  test('常规测试2', () => {
    expect(
      oStrCharAt('Jacky Cheung', 20)
    ).toBe('')
  })
  test('常规测试3', () => {
    expect(
      oStrCharAt('Jacky Cheung', -20)
    ).toBe('')
  })
  test('测试非数字索引', () => {
    expect(
      oStrCharAt('Jacky Cheung', NaN)
    ).toBe('J')
  })
})

describe('测试string的startsWith', () => { 
  test('常规测试', () => {
    expect(
      oStrStartsWith('Jacky Cheung', 'Jac')
    ).toBe(true)
  })
  test('常规测试', () => {
    expect(
      oStrStartsWith('Jacky Cheung', 'Jac')
    ).toBe(true)
  })
  test('常规测试2', () => {
    expect(
      oStrStartsWith('Jacky Cheung', 'ac', 1)
    ).toBe(true)
  })
  test('常规测试3', () => {
    expect(
      oStrStartsWith('Jacky Cheung', 'Jackx')
    ).toBe(false)
  })
  test('常规测试4', () => {
    expect(
      oStrStartsWith('Jacky Cheung', 'Jackx')
    ).toBe(false)
  })
  test('测试越界', () => {
    expect(
      oStrStartsWith('Jacky Cheung', 'Jacky', 100)
    ).toBe(false)
  })
  test('测试越界', () => {
    expect(
      oStrStartsWith('Jacky Cheung', 'Jacky', -10)
    ).toBe(true)
  })
  test('测试不传参数', () => {
    expect(
      oStrStartsWith('Jacky Cheung')
    ).toBe(false)
  })
  test('测试传非字符串类型的子串', () => {
    expect(
      oStrStartsWith('Jacky Cheung', {
        toString: () => 'Jac'
      })
    ).toBe(true)
  })
})
describe('测试string的endsWith', () => {
  test('常规测试', () => {
    expect(
      oStrEndsWith('Jacky Cheung', 'eung')
    ).toBe(true)
  })
  test('常规测试2', () => {
    expect(
      oStrEndsWith('Jacky Cheung', 'eung', 5)
    ).toBe(false)
  })
  test('常规测试2', () => {
    expect(
      oStrEndsWith('Jacky Cheung', 'cky', 5)
    ).toBe(true)
  })
  test('测试越界', () => {
    expect(
      oStrEndsWith('Jacky Cheung', 'Cheung', 200)
    ).toBe(true)
  })
  test('测试越界2', () => {
    expect(
      oStrEndsWith('Jacky Cheung', 'Jacky', -1)
    ).toBe(false)
  })
  test('测试越界3', () => {
    expect(
      oStrEndsWith('Jacky Cheung', '', -1)
    ).toBe(true)
  })
  test('测试不传子字符串', () => {
    expect(
      oStrEndsWith('Jacky Cheung')
    ).toBe(false)
  })
  test('测试传非字符串', () => {
    expect(
      oStrEndsWith('Jacky Cheung', {
        toString: () => 'Jacky'
      }, 5)
    ).toBe(true)
  })
})

describe('测试string的includes', () => { 
  test('常规测试', () => {
    expect(
      oStrIncludes('Jacky Cheung', 'Jacky')
    ).toBe(true)
  })
  test('常规测试1', () => {
    expect(
      oStrIncludes('Jacky Cheung', 'Jackys')
    ).toBe(false)
  })
  test('常规测试2', () => {
    expect(
      oStrIncludes('Jacky Cheung', 'ac', 1)
    ).toBe(true)
  })
  test('常规测试3', () => {
    expect(
      oStrIncludes('Jacky Cheung', 'Ja', 1)
    ).toBe(false)
  })
  test('常规测试4', () => {
    expect(
      oStrIncludes('Jacky Cheung', '', 1)
    ).toBe(true)
  })
  test('测试负下标', () => {
    expect(
      oStrIncludes('Jacky Cheung', 'eung', -10)
    ).toBe(true)
  })
  test('测试越界下标', () => {
    expect(
      oStrIncludes('Jacky Cheung', 'eung', 100)
    ).toBe(false)
  })
})

describe('测试string的indexOf', () => {
  test('常规测试', () => {
    expect(
      oStrIndexOf('Jacky Cheung', 'Jac')
    ).toBe(0)
  })
  test('常规测试1', () => {
    expect(
      oStrIndexOf('Jacky Cheung', 'Jacks')
    ).toBe(-1)
  })
  test('常规测试2', () => {
    expect(
      oStrIndexOf('Jacky Cheung', 'Jack', 1)
    ).toBe(-1)
  })
  test('常规测试2', () => {
    expect(
      oStrIndexOf('Jacky Cheung', 'Cheung', 1)
    ).toBe(6)
  })
  test('常规测试3', () => {
    expect(
      oStrIndexOf('Jacky Cheung', '', 1)
    ).toBe(1)
  })
  test('测试越界', () => {
    expect(
      oStrIndexOf('Jacky Cheung', 'Jacky', 100)
    ).toBe(-1)
  })
  test('测试负下标', () => {
    expect(
      oStrIndexOf('Jacky Cheung', 'Ch', -100)
    ).toBe(6)
  }) 
})