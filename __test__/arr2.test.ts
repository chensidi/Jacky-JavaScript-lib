const {
  oJoin,
  oArrKeys,
  oArrValues,
  oArrEntries,
  oReduce,
  oEvery,
  oReverse,
  oPush,
  oPop,
  oShift,
  oUnshift,
} = require('../dist/index')

describe('测试array的join方法', () => {
  test('常规测试', () => {
    expect(
      oJoin([1,2,3], '+')
    ).toBe('1+2+3')
  })
  test('常规测试2', () => {
    expect(
      oJoin([1,2,3])
    ).toBe('1,2,3')
  })
  test('常规测试3', () => {
    expect(
      oJoin([1,2,{}])
    ).toBe('1,2,[object Object]')
  })
  test('缺位', () => {
    expect(
      oJoin([1,undefined,{}])
    ).toBe('1,,[object Object]')
  })
  test('分隔符非字符串', () => {
    expect(
      oJoin([1,undefined,{}], true)
    ).toBe('1truetrue[object Object]')
  })
  test('分隔符非字符串2', () => {
    expect(
      oJoin([1,2,3], {})
    ).toBe('1[object Object]2[object Object]3')
  })
})

describe('测试array的keys方法', () => {
  test('常规测试', () => {
    const keys = oArrKeys([1,2,3])
    for (let i of keys) {
      console.log(i)
    }
  })
})

describe('测试array的values方法', () => {
  test('常规测试', () => {
    const keys = oArrValues([1,2,3])
    for (let i of keys) {
      console.log(i)
    }
  })
})

describe('测试array的entries方法', () => {
  test('常规测试', () => {
    const entries = oArrEntries([1,2,3])
    const res: any[] = []
    for (let item of entries) {
      res.push(item)
    }
    expect(res).toEqual(
      [
        [0, 1],
        [1, 2],
        [2, 3],
      ]
    )
  })
  test('常规测试2', () => {
    const entries = oArrEntries(['a', 'b',,'d'])
    const res: any[] = []
    for (let item of entries) {
      res.push(item)
    }
    expect(res).toEqual(
      [
        [0, 'a'],
        [1, 'b'],
        [2, undefined],
        [3, 'd'],
      ]
    )
  })
})

describe('测试array的reduce方法', () => {
  test('常规测试', () => {
    expect(
      oReduce([1,2,3,4], (prev: number, cur: number) => {
        return prev + cur
      })
    ).toBe(10)
  })
  test('常规测试2', () => {
    expect(
      oReduce([1,2,3,4], (prev: number, cur: number) => {
        return prev + cur
      }, 1)
    ).toBe(11)
  })
  test('常规测试3', () => {
    expect(
      oReduce([1,2,3,4], (prev: number, cur: number, idx: number) => {
        return prev + cur + idx
      }, 1)
    ).toBe(17)
  })
  test('常规测试4', () => {
    expect(
      oReduce([1,2,3,4], (prev: number, cur: number, idx: number, arr: any[]) => {
        return prev + cur + idx + arr[idx]
      }, 1)
    ).toBe(27)
  })
})

describe('测试array的every方法', () => {
  test('常规测试', () => {
    expect(
      oEvery([1,2,3,4], (item: number) => item > 0)
    ).toBe(true)
  })
  test('常规测试2', () => {
    expect(
      oEvery([1,2,3,4], (item: number) => item > 1)
    ).toBe(false)
  })
  // test('常规测试带参数', () => {
  //   expect(
  //     oEvery([1,2,3,4], function (item: number) {
  //       return item >= (this as { num: number })['num']
  //     }, { num: 1 })
  //   ).toBe(true)
  // })
  // test('常规测试带参数2', () => {
  //   expect(
  //     oEvery([1,2,3,4], function (item: number) {
  //       return item > this.num
  //     }, { num: 1 })
  //   ).toBe(false)
  // })
})

describe('测试array的reverse', () => {
  test('常规测试', () => {
    const arr = [1,2,3]
    oReverse(arr)
    expect(
      arr
    ).toEqual([3,2,1])
  })
  test('常规测试2', () => {
    const arr = [1,2,3,4]
    oReverse(arr)
    expect(
      arr
    ).toEqual([4,3,2,1])
  })
})

describe('测试array的push方法', () => { 
  test('常规测试', () => {
    const arr = [1,2,3,4]
    const last = oPush(arr, 5,6,7)
    expect(arr).toEqual([1,2,3,4,5,6,7])
    expect(last).toBe(7)
  })
  test('常规测试', () => {
    const arr = [1,2,3,4]
    const last = oPush(arr)
    expect(arr).toEqual([1,2,3,4])
    expect(last).toBe(4)
  })
})

describe('测试array的pop方法', () => {
  test('常规测试', () => {
    const arr = [1,2,3]
    const res = oPop(arr)
    expect(arr).toEqual([1,2])
    expect(res).toBe(3)
  })
  test('常规测试2', () => {
    const arr: any[] = []
    const res = oPop(arr)
    expect(arr).toEqual([])
    expect(res).toBe(undefined)
  })
})

describe('测试array的shift方法', () => { 
  test('常规测试', () => {
    const arr = [1,2,3]
    const first = oShift(arr)
    expect(arr).toEqual([2,3])
    expect(first).toBe(1)
  })
  test('常规测试2', () => {
    const arr: any[] = []
    const first = oShift(arr)
    expect(arr).toEqual([])
    expect(first).toBe(undefined)
  })
})

describe('测试array的unShift方法', () => { 
  test('常规测试', () => {
    const arr = [1,2,3]
    const len = oUnshift(arr, 'a', 'b', 'c')
    expect(arr).toEqual(['a', 'b', 'c',1,2,3])
    expect(len).toBe(6)
  })
  test('常规测试2', () => {
    const arr = [1,2,3]
    const len = oUnshift(arr)
    expect(arr).toEqual([1,2,3])
    expect(len).toBe(3)
  })
})