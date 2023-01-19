const {
  oStringIterator,
  oStringGenerator,
  oStrAt,
  oStrCharAt,
  oStrStartsWith,
  oStrEndsWith,
  oStrIncludes,
  oStrIndexOf,
  oStrLastIndexOf,
  oStrPadStart,
  oStrSlice,
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
    expect(oStrCharAt('Jacky Cheung', 2)).toBe('c')
  })
  test('常规测试2', () => {
    expect(oStrCharAt('Jacky Cheung', 20)).toBe('')
  })
  test('常规测试3', () => {
    expect(oStrCharAt('Jacky Cheung', -20)).toBe('')
  })
  test('测试非数字索引', () => {
    expect(oStrCharAt('Jacky Cheung', NaN)).toBe('J')
  })
})

describe('测试string的startsWith', () => {
  test('常规测试', () => {
    expect(oStrStartsWith('Jacky Cheung', 'Jac')).toBe(true)
  })
  test('常规测试', () => {
    expect(oStrStartsWith('Jacky Cheung', 'Jac')).toBe(true)
  })
  test('常规测试2', () => {
    expect(oStrStartsWith('Jacky Cheung', 'ac', 1)).toBe(true)
  })
  test('常规测试3', () => {
    expect(oStrStartsWith('Jacky Cheung', 'Jackx')).toBe(false)
  })
  test('常规测试4', () => {
    expect(oStrStartsWith('Jacky Cheung', 'Jackx')).toBe(false)
  })
  test('测试越界', () => {
    expect(oStrStartsWith('Jacky Cheung', 'Jacky', 100)).toBe(false)
  })
  test('测试越界', () => {
    expect(oStrStartsWith('Jacky Cheung', 'Jacky', -10)).toBe(true)
  })
  test('测试不传参数', () => {
    expect(oStrStartsWith('Jacky Cheung')).toBe(false)
  })
  test('测试传非字符串类型的子串', () => {
    expect(
      oStrStartsWith('Jacky Cheung', {
        toString: () => 'Jac',
      })
    ).toBe(true)
  })
})
describe('测试string的endsWith', () => {
  test('常规测试', () => {
    expect(oStrEndsWith('Jacky Cheung', 'eung')).toBe(true)
  })
  test('常规测试2', () => {
    expect(oStrEndsWith('Jacky Cheung', 'eung', 5)).toBe(false)
  })
  test('常规测试2', () => {
    expect(oStrEndsWith('Jacky Cheung', 'cky', 5)).toBe(true)
  })
  test('测试越界', () => {
    expect(oStrEndsWith('Jacky Cheung', 'Cheung', 200)).toBe(true)
  })
  test('测试越界2', () => {
    expect(oStrEndsWith('Jacky Cheung', 'Jacky', -1)).toBe(false)
  })
  test('测试越界3', () => {
    expect(oStrEndsWith('Jacky Cheung', '', -1)).toBe(true)
  })
  test('测试不传子字符串', () => {
    expect(oStrEndsWith('Jacky Cheung')).toBe(false)
  })
  test('测试传非字符串', () => {
    expect(
      oStrEndsWith(
        'Jacky Cheung',
        {
          toString: () => 'Jacky',
        },
        5
      )
    ).toBe(true)
  })
})

describe('测试string的includes', () => {
  test('常规测试', () => {
    expect(oStrIncludes('Jacky Cheung', 'Jacky')).toBe(true)
  })
  test('常规测试1', () => {
    expect(oStrIncludes('Jacky Cheung', 'Jackys')).toBe(false)
  })
  test('常规测试2', () => {
    expect(oStrIncludes('Jacky Cheung', 'ac', 1)).toBe(true)
  })
  test('常规测试3', () => {
    expect(oStrIncludes('Jacky Cheung', 'Ja', 1)).toBe(false)
  })
  test('常规测试4', () => {
    expect(oStrIncludes('Jacky Cheung', '', 1)).toBe(true)
  })
  test('测试负下标', () => {
    expect(oStrIncludes('Jacky Cheung', 'eung', -10)).toBe(true)
  })
  test('测试越界下标', () => {
    expect(oStrIncludes('Jacky Cheung', 'eung', 100)).toBe(false)
  })
})

describe('测试string的indexOf', () => {
  test('常规测试', () => {
    expect(oStrIndexOf('Jacky Cheung', 'Jac')).toBe(0)
  })
  test('常规测试1', () => {
    expect(oStrIndexOf('Jacky Cheung', 'Jacks')).toBe(-1)
  })
  test('常规测试2', () => {
    expect(oStrIndexOf('Jacky Cheung', 'Jack', 1)).toBe(-1)
  })
  test('常规测试2', () => {
    expect(oStrIndexOf('Jacky Cheung', 'Cheung', 1)).toBe(6)
  })
  test('常规测试3', () => {
    expect(oStrIndexOf('Jacky Cheung', '', 1)).toBe(1)
  })
  test('测试越界', () => {
    expect(oStrIndexOf('Jacky Cheung', 'Jacky', 100)).toBe(-1)
  })
  test('测试负下标', () => {
    expect(oStrIndexOf('Jacky Cheung', 'Ch', -100)).toBe(6)
  })
})

describe('测试string的lastIndexOf', () => {
  test('常规测试', () => {
    expect(oStrLastIndexOf('Jacky Cheung', 'Jack')).toBe(0)
  })
  test('常规测试2', () => {
    expect(oStrLastIndexOf('Jacky cheung', 'c')).toBe(6)
  })
  test('常规测试3', () => {
    expect(oStrLastIndexOf('banana', 'na')).toBe(4)
  })
  test('常规测试4', () => {
    expect(oStrLastIndexOf('banana', 'naa')).toBe(-1)
  })
  test('常规测试5', () => {
    expect(oStrLastIndexOf('banana', 'na', 3)).toBe(2)
  })
  test('测试空字符串', () => {
    expect(oStrLastIndexOf('banana', '')).toBe(6)
  })
  test('测试0下标', () => {
    expect(oStrLastIndexOf('banana', 'b', 0)).toBe(0)
  })
  test('测试负数下标', () => {
    expect(oStrLastIndexOf('banana', 'a', -10)).toBe(-1)
  })
  test('测试负数下标&空字符串', () => {
    expect(oStrLastIndexOf('banana', '', -10)).toBe(0)
  })
  test('测试越界下标&空字符串', () => {
    expect(oStrLastIndexOf('1234', '', 100)).toBe(4)
  })
})

describe('测试string的padStart', () => {
  test('常规测试', () => {
    expect(oStrPadStart('Jacky', 10, 'Cheung')).toBe('CheunJacky')
  })
  test('常规测试2', () => {
    expect(oStrPadStart('Jacky', 9, '12')).toBe('1212Jacky')
  })
  test('常规测试2', () => {
    expect(oStrPadStart('Jacky', 9, '1')).toBe('1111Jacky')
  })
  test('常规测试3', () => {
    expect(oStrPadStart('Jacky', 9, '1')).toBe('1111Jacky')
  })
  test('测试长度小于目标字符串长度', () => {
    expect(oStrPadStart('Jacky', 3, '1')).toBe('Jacky')
  })
  test('测试不传参数', () => {
    expect(oStrPadStart('Jacky')).toBe('Jacky')
  })
  test('测试不传填充字符串', () => {
    expect(oStrPadStart('Jacky', 7)).toBe('  Jacky')
  })
})

describe('测试string的slice', () => {
  test('常规测试', () => {
    expect(oStrSlice('Jacky Cheung', 2)).toBe('cky Cheung')
  })
  test('常规测试2', () => {
    expect(oStrSlice('Jacky Cheung', 2, 4)).toBe('ck')
  })
  test('越界测试1', () => {
    expect(oStrSlice('Jacky Cheung', 2, 200)).toBe('cky Cheung')
  })
  test('越界测试2', () => {
    expect(oStrSlice('Jacky Cheung', -3, -1)).toBe('un')
  })
  test('越界测试3', () => {
    expect(oStrSlice('Jacky Cheung', -3, -4)).toBe('')
  })
  test('越界测试4', () => {
    expect(oStrSlice('Jacky Cheung', -3, -40)).toBe('')
  })
  test('越界测试5', () => {
    expect(oStrSlice('Jacky Cheung', -3, 3)).toBe('')
  })
})
