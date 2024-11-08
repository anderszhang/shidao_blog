---
description: Javascript中的垃圾回收（GC）
categroy: 
    - ES6
tag: 
    - JavaScript
---

# Javascript中的垃圾回收（GC）

在早期的高级程序语言中保留有很多底层的接口，比如C语言可以使用malloc()在堆中分配一块内存，使用free()回收内存。在那个时代，程序员们可以精细的使用内存，写出又小又快的程序，但是他们也必须事事小心，否则就可能造成内存泄漏，而这种问题往往是难以排查的。随着科技的进步，生活的各个场景都需要程序来助力，新的时代要求开发更有效率，更容易学习的语言，因此上世纪90年开始，新的高级程序语言如Java, Javascript,Go等都具有内存管理的功能，即自动的在合适的地方分配内存，并在不使用它们时“自动”释放。释放的过程称为垃圾回收。

在JavaScript中，基本类型数据（如Number、String、Boolean、Undefined、Null）都是分配在栈中，JavaScript中的对象、数组、函数等复杂类型的数据都是存储在堆上的，当我们创建这些类型的变量时，栈上创建了一个引用，这个引用指向堆上的具体数据。栈中的数据是出栈释放，而堆中的数据则在不再使用此对象的时候释放。

怎样判断对象不在被使用呢？有两种主要的算法

## 引用计数算法
这是最初级的垃圾收集算法， 在运行时为每个对象维护一个计数器，当增加一个引用时，计数器加1，减少一个引用则计数器减1，如果计数器为0，则标记该堆中区域可以回收。

```js
// 在堆中为new Date分配一块内存，a指向该块内存，计数器=1
let a = new Date()
// 变量b也指向该块内存，计数器=2
let b = a;
// a不再指向该块内存，计数器-1， 值=1
a = null
// b也不再指向该块内存，计数器-1，值=0， 堆中该块区域可以被回收
ba = null
```

但是简单的引用计数法有个现在，就是它无法处理循环引用的情况，如下

```js
let p = new Parent()
let c = new Child()
p.child = c
c.parent = p

```
上面的代码中p.child指向了c对象， c.parent指向了p对象，如果不对这两个属性置null, 那么p和c的引用计数永远会大于0，不能回收。

## 标记清除算法

标记清除算法假定从一个叫做根（root）的对象（在 Javascript 里，根是全局对象）出发，找所有从根开始引用的对象，然后找这些对象引用的对象，所有不能从跟出发访问到的对象都标记为可以回收的对象

现代的JS引擎一般都是采用标记清除算法。


## 与GC相关的数据类型

### WeakMap

从名字上看，这是一个存放键值对的容器。 在JS的早期，存放键值对类型的容器只有Object可选，但是object存放键值对有两个限制

1. object存放的key, 只能为字符串类型
2. object存放的key, 在遍历时，顺序不保证与插入时顺序一致

随着前端程序的复杂性提高，单一字符串类型的key值不能很方便的满足需求，比如需要存放一个节点及其元数据的场景，于是出现了Map和WeakMap类型。


Map则可以支持key值为任意类型， 且保证遍历时与插入顺序一致。

WeakMap仅支持key为对象或者非注册的symbol类型， 且WeakMap key对对象的引用不阻止垃圾回收。 如果key对象没有其他使用了， 则在WeakMap中该key对应的value 也可以标记为垃圾回收。从而提高了内存利用率。

### WeakSet

与Object, Map,WeakMap类似，从数组容器发展而来Set和WeakSet是存放队列的容器

WeakSet仅支持对象或者非注册的symbol类型的元素队列，存放的元素不阻止垃圾回收，如果存放的元素无其他使用，则标记为可回收、

### WeakRef

WeakRef 对象包含对对象的弱引用，但是ECMA尚没有对此实现有正式规范规范，因此不建议使用
