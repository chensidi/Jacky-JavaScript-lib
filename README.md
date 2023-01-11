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
```

### Array数组原生方法的实现

+ [x] `oMap(arr: any[], callback: (item: any, index?: number, arr?: any[]) => any[])`
  对应原生js中array的map方法

+ [x] `oFill(arr: any[], arr: any[], value: any, start = 0, end = arr.length)`
  对应原生js中array的fill方法
  