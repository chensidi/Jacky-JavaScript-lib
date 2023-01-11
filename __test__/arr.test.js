const {
  oMap,
  oFill,
  oFilter,
  oAt,
  oConcat,
  oFind,
  oFindIndex,
  oFindLast,
  oFindLastIndex,
  oFlat,
  oForEach,
  oIncludes,
  oIndexOf,
  oIsArray,
} = require('../dist/index')
/* import { 
  oMap,
  oFill, 
  oFilter,
  oAt,
  oConcat,
  oFind,
  oFindIndex,
  oFindLast,
  oFindLastIndex,
  oFlat,
  oForEach,
} from '../dist/index.esm' */
// import { oMap, oFill, oFilter } from '../dist/index'

/* 
  测试Array实现的方法
*/
test('array的map方法', () => {
  expect(oMap([1, 2, 3], (item, idx) => item * 2)).toEqual([2, 4, 6])
})

describe('array的fill方法', () => {
  test('不传下标', () => {
    const arr = [1, 2, 3]
    oFill(arr, 100)
    expect(arr).toEqual([100, 100, 100])
  })
  test('传start', () => {
    const arr = [1, 2, 3]
    oFill(arr, 100, 1)
    expect(arr).toEqual([1, 100, 100])
  })
  test('传start,end', () => {
    const arr = [1, 2, 3]
    oFill(arr, 100, 1, 2)
    expect(arr).toEqual([1, 100, 3])
  })
  test('传start越界<0', () => {
    const arr = [1, 2, 3]
    oFill(arr, 100, -1, 2)
    expect(arr).toEqual([1, 2, 3])
  })
  test('传start越界>length', () => {
    const arr = [1, 2, 3]
    oFill(arr, 100, 4, 2)
    expect(arr).toEqual([1, 2, 3])
  })
  test('传end越界>length', () => {
    const arr = [1, 2, 3]
    oFill(arr, 100, 4, 6)
    expect(arr).toEqual([1, 2, 3])
  })
  test('传非数字下标', () => {
    const arr = [1, 2, 3]
    oFill(arr, 100, '++', '2')
    expect(arr).toEqual([100, 100, 3])
  })
})

describe('测试array的filter', () => {
  test('正常测试', () => {
    expect(oFilter([1, 2, 3], item => item > 1)).toEqual([2, 3])
  })
  test('正常测试2', () => {
    expect(oFilter([1, 2, 3], item => item)).toEqual([1, 2, 3])
  })
  test('正常测试3', () => {
    expect(oFilter([1, 2, 3], item => item * 2 > 2)).toEqual([2, 3])
  })
})

describe('测试array的at方法', () => {
  test('常规测试', () => {
    expect(oAt([1, 2, 3, 4], 2)).toEqual(3)
  })
  test('越界下标', () => {
    expect(oAt([1, 2, 3, 4], 100)).toEqual(undefined)
  })
  test('非数字下标1', () => {
    expect(oAt([1, 2, 3, 4], '+')).toEqual(1)
  })
  test('负数下标1', () => {
    expect(oAt([1, 2, 3, 4], -2)).toEqual(3)
  })
  test('负数下标2', () => {
    expect(oAt([1, 2, 3, 4], -7)).toEqual(undefined)
  })
})

describe('测试array的concat方法', () => {
  test('常规测试', () => {
    expect(oConcat([1, 2, 3], 4, 5, 6)).toEqual([1, 2, 3, 4, 5, 6])
  })
  test('常规测试2', () => {
    expect(oConcat([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6])
  })
  test('常规测试3', () => {
    expect(oConcat([1, 2, 3], [4], [5, 6])).toEqual([1, 2, 3, 4, 5, 6])
  })
  test('常规测试4', () => {
    expect(oConcat([1, 2, 3], [4], [[5, 6]])).toEqual([1, 2, 3, 4, [5, 6]])
  })
  test('常规测试5', () => {
    const list = [1, 2, 3]
    expect(oConcat(list, [4], [[5, 6]])).toEqual([1, 2, 3, 4, [5, 6]])
    expect(list).toEqual([1, 2, 3])
  })
})

describe('测试array的find方法', () => {
  test('常规测试', () => {
    expect(oFind([1, 2, 3, 4], item => item > 1)).toEqual(2)
  })
  test('常规测试2', () => {
    expect(oFind([1, 2, 3, 4], (item, i) => item > 1 && i > 2)).toEqual(4)
  })
})

describe('测试array的findIndex方法', () => {
  test('常规测试', () => {
    expect(
      oFindIndex([1, 2, 3], item => {
        return item > 1
      })
    ).toEqual(1)
  })
  test('常规测试', () => {
    expect(
      oFindIndex([1, 2, 3], (item, i) => {
        return item > 1 && i > 1
      })
    ).toEqual(2)
  })
  test('测试越界', () => {
    expect(
      oFindIndex([1, 2, 3], (item, i) => {
        return item > 1 && i > 100
      })
    ).toEqual(-1)
  })
  test('测试this', () => {
    expect(
      oFindIndex(
        [1, 2, 3],
        function (item, i) {
          console.log(this)
          return item > 1 && i > 100
        },
        1
      )
    ).toEqual(-1)
  })
})

describe('测试array的findLast方法', () => {
  test('常规测试', () => {
    expect(
      oFindLast([1, 2, 3], item => {
        return item > 1
      })
    ).toEqual(3)
  })
  test('常规测试2', () => {
    expect(
      oFindLast([1, 2, 3], (item, i) => {
        return item > 1 && i < 2
      })
    ).toEqual(2)
  })
  test('常规测试3', () => {
    expect(
      oFindLast([1, 2, 3], (item, i) => {
        return item > 10 && i < 2
      })
    ).toEqual(undefined)
  })
  test('测试this', () => {
    expect(
      oFindLast(
        [1, 2, 3],
        function (item, i) {
          console.log(this)
          return this.id < item
        },
        { name: 'jacky', id: 1 }
      )
    ).toEqual(3)
  })
})

describe('测试array的findLastIndex的方法', () => {
  test('常规测试', () => {
    expect(
      oFindLastIndex([1, 2, 3], item => {
        return item > 1
      })
    ).toEqual(2)
  })
  test('常规测试', () => {
    expect(
      oFindLastIndex([1, 2, 3], (item, i) => {
        return item > 1 && i > 1
      })
    ).toEqual(2)
  })
  test('测试越界', () => {
    expect(
      oFindLastIndex([1, 2, 3], (item, i) => {
        return item > 1 && i > 100
      })
    ).toEqual(-1)
  })
  test('测试this', () => {
    expect(
      oFindLastIndex(
        [1, 2, 3],
        function (item, i) {
          console.log(this)
          return item == this
        },
        1
      )
    ).toEqual(0)
  })
})

describe('测试array的flat的方法', () => {
  test('常规测试', () => {
    expect(oFlat([1, [2, 3, [4]]], 1)).toEqual([1, 2, 3, [4]])
  })
  test('常规测试1', () => {
    expect(oFlat([1, [2, 3, [4]]], 4)).toEqual([1, 2, 3, 4])
  })
  test('常规测试不传次数', () => {
    expect(oFlat([1, [2, 3, [4, [5, [[6]]]]]])).toEqual([1, 2, 3, 4, 5, 6])
  })
  test('测试传非数字参数', () => {
    expect(oFlat([1, [2, 3, [4, [5, [[6]]]]]], 'AB')).toEqual([
      1,
      [2, 3, [4, [5, [[6]]]]],
    ])
  })
  test('测试负数字参数', () => {
    expect(oFlat([1, [2, 3, [4, [5, [[6]]]]]], -1)).toEqual([
      1,
      [2, 3, [4, [5, [[6]]]]],
    ])
  })
})

describe('测试array中的forEach方法', () => {
  test('常规测试', () => {
    const res = []
    oForEach([1, 2, 3], (item, i) => {
      res.push(item * i)
    })
    expect(res).toEqual([0, 2, 6])
  })
  test('测试this', () => {
    const res = [1, 2, 3]
    oForEach(
      res,
      function (item, i) {
        this[i] = item * i
      },
      res
    )
    expect(res).toEqual([0, 2, 6])
  })
})

describe('测试array中的includes方法', () => {
  test('常规测试', () => {
    expect(oIncludes([1, 2, 3], '1')).toBe(false)
  })
  test('常规测试2', () => {
    expect(oIncludes([1, 2, 3], 1)).toBe(true)
  })
  test('常规测试3', () => {
    expect(oIncludes([{ name: 1 }], { name: 1 })).toBe(false)
  })
  test('常规测试4带下标', () => {
    expect(oIncludes([1, 2, 3], 2, 1)).toBe(true)
  })
  test('常规测试5带下标', () => {
    expect(oIncludes([1, 2, 3], 2, -10)).toBe(true)
  })
  test('常规测试6带下标越界', () => {
    expect(oIncludes([1, 2, 3], 2, 10)).toBe(false)
  })
})

describe('测试array中的indexOf方法', () => {
  test('常规测试', () => {
    expect(oIndexOf([1, 2, 3], '1')).toBe(-1)
  })
  test('常规测试2', () => {
    expect(oIndexOf([1, 2, 3], 1)).toBe(0)
  })
  test('常规测试3', () => {
    expect(oIndexOf([{ name: 1 }], { name: 1 })).toBe(-1)
  })
  test('常规测试4带下标', () => {
    expect(oIndexOf([1, 2, 3], 2, 1)).toBe(1)
  })
  test('常规测试5带下标', () => {
    expect(oIndexOf([1, 2, 3], 2, -10)).toBe(1)
  })
  test('常规测试6带下标越界', () => {
    expect(oIndexOf([1, 2, 3], 2, 10)).toBe(-1)
  })
})

describe('测试array的isArray方法', () => {
  test('常规测试', () => {
    expect(oIsArray([1, 2, 3])).toBe(true)
  })
  test('常规测试2', () => {
    expect(oIsArray({ foo: 123 })).toBe(false)
  })
  test('常规测试3', () => {
    expect(oIsArray('foobar')).toBe(false)
  })
  test('常规测试4', () => {
    expect(oIsArray(new Uint8Array(32))).toBe(false)
  })
  test('常规测试5', () => {
    expect(oIsArray({ __proto__: Array.prototype })).toBe(true)
  })
})
