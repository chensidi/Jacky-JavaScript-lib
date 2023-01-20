/* 
  测试number实现方法
*/

const { oNumIsFinite, oNumIsInteger, oNumEqual, oNumIsNaN, oNumToString } = require('../dist/index')

describe('测试isFinite方法', () => {
  test('常规测试', () => {
    expect(oNumIsFinite(2)).toBe(true)
  })
  test('常规测试2', () => {
    expect(oNumIsFinite(NaN)).toBe(false)
  })
  test('常规测试2', () => {
    expect(oNumIsFinite(NaN)).toBe(false)
  })
  test('常规测试3', () => {
    expect(oNumIsFinite(1 / 0)).toBe(false)
  })
  test('常规测试4', () => {
    expect(oNumIsFinite(-Infinity)).toBe(false)
  })
  test('常规测试5', () => {
    expect(oNumIsFinite(2e64)).toBe(true)
  })
  test('常规测试6', () => {
    expect(oNumIsFinite('0')).toBe(false)
  })
  test('常规测试7', () => {
    expect(oNumIsFinite(null)).toBe(false)
  })
})

describe('测试number的isInteger方法', () => {
  test('常规测试', () => {
    expect(oNumIsInteger(0)).toBe(true)
  })
  test('常规测试2', () => {
    expect(oNumIsInteger(-100000)).toBe(true)
  })
  test('常规测试3', () => {
    expect(oNumIsInteger(0.1)).toBe(false)
  })
  test('常规测试4', () => {
    expect(oNumIsInteger(Math.PI)).toBe(false)
  })
  test('常规测试5', () => {
    expect(oNumIsInteger(Infinity)).toBe(false)
  })
  test('常规测试6', () => {
    expect(oNumIsInteger(-Infinity)).toBe(false)
  })
  test('常规测试7', () => {
    expect(oNumIsInteger('10')).toBe(false)
  })
  test('常规测试8', () => {
    expect(oNumIsInteger([1])).toBe(false)
  })
})

describe('测试oNumEqual方法', () => {
  test('常规测试', () => {
    expect(oNumEqual(0.1 + 0.2, 0.3)).toBe(true)
  })
  test('常规测试2', () => {
    expect(oNumEqual(0.1 + 0.2, 0.31)).toBe(false)
  })
  test('常规测试3', () => {
    expect(oNumEqual(true, 1)).toBe(true)
  })
})

describe('测试Number的isNaN方法', () => {
  test('常规测试', () => {
    expect(
      oNumIsNaN(NaN)
    ).toBe(true)
  })
  test('常规测试2', () => {
    expect(
      oNumIsNaN('1')
    ).toBe(false)
  })
  test('常规测试3', () => {
    expect(
      oNumIsNaN('100F')
    ).toBe(false)
  })
  test('常规测试3', () => {
    expect(
      oNumIsNaN(0 / 0)
    ).toBe(true)
  })
})

describe('测试Number的toString方法', () => {
  test('常规测试', () => {
    expect(
      oNumToString(10, 2)
    ).toBe('1010')
  })
  test('常规测试2', () => {
    expect(
      oNumToString(10, 16)
    ).toBe('a')
  })
  test('常规测试3', () => {
    expect(
      oNumToString(147, 11)
    ).toBe('124')
  })
  test('常规测试4', () => {
    expect(
      oNumToString(147, 30)
    ).toBe('4r')
  })
  test('常规测试5', () => {
    expect(
      oNumToString(147)
    ).toBe('147')
  })
  test('测试负数底数', () => {
    expect(
      oNumToString(-147, 30)
    ).toBe('-4r')
  })
  test('测试负数底数2', () => {
    expect(
      oNumToString(-0xff, 2)
    ).toBe('-11111111')
  })
})