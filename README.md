# 原生JS常用手动实现的方法库

## 介绍

ECMAScript为开发者提供了很多原生的方法或属性，根据这么多年的使用情况和相关经验，使用原生JS将这些常用的方法做了一次手动实现过程，目的如下

+ 梳理总结自己这些年的JS开发经验，手动实现各种原生方法有利于更深刻理解这些api，同时提高自己JS功力
+ 帮助各位初学者或者JS基本功需要提升的同学，看看这些功能换成你是否能够写出来
+ 这些实现的方法会集成到本人的工具库里面，发布至npm，各位可下载讨论和使用，当然主要的目的是提高一个造轮子能力，实际开发还是以原生官方api为优先

## 安装

```bash
npm i jacky-js-tools
```

## 方法函数清单

本lib库利用ts实现了各种原生es的方法，为了与原生方法区分，所有方法统一在前面增加了`o`的前缀，例如 `oMap` 对应是 原生数组的 `map` 方法，但需要主要的是，本lib库中实现的方法并没有挂载到对应数组或对象的原型链上，所以调用的时候，需要将原数组或对象传入函数，例如

```js
// 原生array的map方法调用
const res = [1, 2, 3].map(item => item * 2)
console.log(res) // [2, 4, 6]
```

```js
// 导入本库里面的oMap后调用
import { oMap } from 'jacky-js-tools'

const res = oMap([1,2,3], item => item * 2)
console.log(res) // [2, 4, 6]

// 以此类推后续所以方法，总之第一个参数为数组本身，后续参数与js原生方法保持一致即可，不再赘述
```

> 注意，如果原生js数组的某方法会改变数组本身，则该库实现的方法也会改变数组本身，这个特性和原生js保持一致的，反之亦然

### Array数组原生方法的实现

+ [x] `oMap(arr: any[], callback: (item: any, index?: number, arr?: any[]) => any[])`
  对应原生js中array的map方法

+ [x] `oFill(arr: any[], arr: any[], value: any, start = 0, end = arr.length)`
  对应原生js中array的fill方法

+ [x] `oFilter(arr: any[], callback: (item: any, index?: number, arr?: any[]) => any[])`
  对应原生js中array的filter方法

+ [x] `oAt(arr: any[], index: number)`
  对应原生js中array的at方法

+ [x] `oConcat(arr: any[], ...rest: any[]): any[]`
  对应原生js中array的concat方法

+ [x] `oFind(arr: any[], callback: (item: any, index?: number, arr?: any[]) => boolean, thisArg?: any): any`
  对应原生js中array的find方法

+ [x] `oFindIndex(arr: any[], callback: (item: any, index?: number, arr?: any[]) => boolean, thisArg?: any): number`
  对应原生js中array的findIndex方法

+ [x] `oFindLast(arr: any[], callback: (item: any, index?: number, arr?: any[]) => boolean, thisArg?: any): number`
  对应原生js中array的findLast方法

+ [x] `oFindLastIndex(arr: any[], callback: (item: any, index?: number, arr?: any[]) => boolean, thisArg?: any): number`
  对应原生js中array的findLastIndex方法

+ [x] `oFlat(arr: any[], deep: number = Infinity): any[]`
  对应原生js中array的flat方法

+ [x] `oForEach(arr: any[], callback: (item: any, index?: number, arr?: any[]) => any): any[]`
  对应原生js中array的forEach方法

+ [x] `oIncludes(arr: any[], item: any, fromIndex = 0): boolean`
  对应原生js中array的includes方法

+ [x] `oIndexOf(arr: any[], item: any, fromIndex = 0): number`
  对应原生js中array的indexOf方法

+ [x] `oIsArray(arr: any): boolean`
  对应原生js中array的isArray方法

+ [x] `oJoin(arr: any[], flag: string = ','): string`
  对应原生js中array的join方法

+ [x] `oArrKeys(arr: any[]): Iterable<number>`
  对应原生js中array的keys方法

+ [x] `oArrEntries(arr: any[]): Iterable<[number, any][]>`
  对应原生js中array的entries方法

+ [x] `oReduce(arr: any[], callback: ReduceCallback, initVal?: any)`
  对应原生js中array的reduce方法

+ [x] `oEvery(arr: any[], callback: (item: any, index?: number, arr?: any[]) => any, thisArg?: any): boolean`
  对应原生js中array的every方法

+ [x] `oSome(arr: any[], callback: (item: any, index?: number, arr?: any[]) => any, thisArg?: any): boolean`
  对应原生js中array的some方法

+ [x] `oReverse(arr: any[])`
  对应原生js中array的reverse方法

+ [x] `oPush(arr: any[], ...rest: any[]): number`
  对应原生js中array的push方法

+ [x] `oPop(arr: any[])`
  对应原生js中array的pop方法

+ [x] `oShift(arr: any[])`
  对应原生js中array的shift方法

+ [x] `oUnshift(arr: any[], ...rest: any[]): number`
  对应原生js中array的unshift方法

+ [x] `oSlice(arr: any[], start = 0, end = Infinity): any[]`
  对应原生js中array的slice方法

+ [x] `oSplice(arr: any[], start: number, deleteCount: number, ...rest: any[])`
  对应原生js中array的splice方法

### String字符串原生方法的实现

> 字符串的方法，以 `oStr` 为前缀，例如 `oStrStartsWith` 对应原生 `startsWith`, 传参方式依旧，第一个参数是目标字符串本身，后续参数按原生方法中的顺序传入， 示例如下

```ts
// 原生js方法
const str = 'Jacky Chueng'
str.startsWith('Jacky') // true
str.startsWith('Jacky', 1) // false
```

```ts
// 本库中方法
import { oStrStartsWith } from 'jacky-js-tools'
const str = 'Jacky Chueng'
oStrStartsWith(str, 'Jacky') // true
oStrStartsWith(str, 'Jacky', 1) // false
```

- [x] `oStringIterator(str: string)`
  这是用来生成字符串迭代器的方法
  
  ```ts
  const str = '123'
    const arr: string[] = []
    const itr = oStringIterator(str)
    for (let item of itr) {
      arr.push(item)
    }
    console.log(arr) // ['1', '2', '3']
  ```

- [x] `oStringGenerator(str: string)`
  这是也用来生成字符串迭代器的方法，只不过使用 generator 函数实现，调用方式与上一个一致

- [x] `oStrAt(str: string, index: number): string`
  对应原生string的 `at` 方法

- [x] `oStrCharAt(str: string, index: number): string`
  对应原生string的 `charAt` 方法

- [x] `oStrStartsWith(str: string, subStr: string, position = 0): boolean`
  对应原生string的 `startsWith` 方法

- [x] `oStrEndsWith(str: string, subStr: string, length = str.length): boolean`
  对应原生string的 `endsWith` 方法

目前Array的方法大部分已经实现, String的方法正在实现中... 功能清单正在抓紧时间更新同步中，大家可以通过vscode提示找到对应函数，也可以通过编辑器自动提示导出对应函数
