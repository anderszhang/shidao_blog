---
title: vue3 reactivity 实现
article: false
date: 2024-10-11
category:
  - 前端
tag:
  - 前端，vue3, reactivity
---

Vue 3的响应性实现原理，网络上已经有很多文章介绍了，但是多聚焦于Proxy handler方法的实现，其核心组件Link, Dep, Subscriber的分析，我没有找到什么资料，所以记录下自己的阅读理解。

# 原理

Proxy 对象代理了对原始对象读写操作， 当对代理对象字段进行读操作时， 框架收集了对该字段进行操作的方法（这个过程称之为track），并保存在一个容器中，当对代理对象进行写操作时，框架将保存的方法重新执行, 即完成了数据最新结果的使用(此过程称之为trigger)


# 概念
 如上所述，框架需要保存执行方法（副作用方法）和引起方法执行的依赖，如下代码
 ```js
    let dummy1, dummy2
    const counter = reactive({ num: 0 })
    effect(
      () => (dummy1 = counter.num)
    )
 ```
 effect是vue3 内部用以实现响应式的一个函数，watch,computed的实现都是调用它，它接受一个副作用方法。
 counter.num是引起变化的数据， 可以为counter, num两部分
 保存这个关系的数据结构为一个多层的Map结构
 补充下WeakMap与Map结构的区别

## Dep
定义了需要引起副作用函数执行的一个依赖，对应一个响应式数据. 响应数据的每次修改，都会引起dep.version的自增

上面例子中的counter.num对应一个Dep对象
## Subscriber--ReactEffect
Subscriber接口，与副作用函数对应，ReactEffect为此接口的实现

## Link
Link 将 Dep和Subscribe联系起来， 同时由于Subscribe 和 Dep 之间是一个多对多的关系， 即副作用函数的的执行可能会又因多个原因造成， 一个数据的修改也可能引起多个副作用函数的执行，因此Link被设计为双向链表节点


# 流程
