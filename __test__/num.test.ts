/* 
  测试number实现方法
*/

const { oNumIsFinite, oNumIsInteger } = require('../dist/index')

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
    expect(
      oNumIsInteger(0)
    ).toBe(true)
  })
  test('常规测试2', () => {
    expect(
      oNumIsInteger(-100000)
    ).toBe(true)
  })
  test('常规测试3', () => {
    expect(
      oNumIsInteger(0.1)
    ).toBe(false)
  })
  test('常规测试4', () => {
    expect(
      oNumIsInteger(Math.PI)
    ).toBe(false)
  })
  test('常规测试5', () => {
    expect(
      oNumIsInteger(Infinity)
    ).toBe(false)
  })
  test('常规测试6', () => {
    expect(
      oNumIsInteger(-Infinity)
    ).toBe(false)
  })
  test('常规测试7', () => {
    expect(
      oNumIsInteger('10')
    ).toBe(false)
  })
  test('常规测试8', () => {
    expect(
      oNumIsInteger([1])
    ).toBe(false)
  })
})
