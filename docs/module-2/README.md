# 全面拥抱ES6和AJAX HTTP

## 一、ES6、ES7的核心知识

### 57、ES6中常用的基础知识

#### 赋值解构

##### 数组赋值解构

``` javascript
/*
 * 解构赋值主要是针对于数组和对象的：真实项目中，一般常用于把从服务器获取的JSON数据进行快速解构，赋值给对应的变量，帮助我们快速拿到对应的结果 
 */
let arr = [10, 20, 30, 40];

let [a, b, c, d] = arr;
console.log(a, b, c, d);
// 10 20 30 40

let [a, , , b] = arr;
console.log(a, b);
// 10 40

let [a] = arr;
console.log(a);
// 10

let [a, ...b] = arr;
console.log(a, b);
// 10 [20,30,40]

let [a] = arr.reverse();
console.log(a);
// 40

// 赋值默认值
let arr = [10];
let [a, b = 0] = arr;
console.log(a, b);
// 10 0

// a/b互换值
let a = 10,
    b = 20;

let c = a;
a = b;
b = c;
console.log(a, b);

a = a + b;
b = a - b;
a = a - b;
console.log(a, b);

[b, a] = [a, b];
console.log(a, b);
```

##### 对象赋值解构

``` javascript
let obj = {
    id: 1,
    name: '珠峰培训',
    age: 10
};

// 对象解构赋值，创建的变量名需要和属性名保持一致
let {
    id,
    name,
    sex
} = obj;
console.log(id, name, sex);

// 赋值默认值
let {
    sex = 0
} = obj;
console.log(id, name, sex);

// 设置别名
let age = 0;
let {
    age: age1
} = obj;
console.log(age1);
```

#### 扩展运算符

``` javascript
/*
 * ...运算符
 *   1.扩展运算符  let [...arr]=[10,20,30,40];
 *   2.剩余运算符  函数的形参赋值上
 *   3.展开运算符  展开数组或者对象中的每一项
 */
let fn = (n, ...m) => {
    // 箭头函数中没有arguments
    console.log(n, m);
};
fn(10, 20, 30, 40);

// 数组克隆 （展开运算符）
let arr1 = [10, 20, 30];
let arr2 = [...arr1];
fn.call(obj, ...arr1); // fn(10,20,30)
```

``` javascript
Array.from() // 把一个类数组集合（Set集合）转换为数组
Array.of() // 把一组值转换为数组
ES5中Array常用的一个方法： Array.isArray() 验证是否为数组

Array.prototype // 新增的方法
new Array(3).fill(null) // 创建集合长度为3，每一项都填充为null
includes
flat() // 数组扁平化
entries()， keys()， values()
find / findIndex => 数组的遍历迭代方法 forEach / map / filter / find / some / every / reduce...

    Object.assign([obj1], [obj2]) // 合并对象，把[obj2]的信息替换[obj1]
Object.create([obj]) // 创建一个空对象，让其__proto__指向[obj]
Object.defineProperty([obj], [key], [options]) // 监听一个对象某个属性的处理操作
Object.entries([obj]) // 获取一个对象所有的键值对
Object.keys([obj])
Object.values([obj])
Object.freeze([obj]) // 冻结对象，让其所有操作都不能进行
Object.is([value1], [value2]) // 比较两个值是否相等，比==/===更准确 

// const创建的变量不能更改变量的指针指向，但是对于对象来说可以操作其堆内存中的信息

// 数组去重
// - 对象键值对
// - 双循环
// - ...
let arr = [1, 1, 1, 2, 3, 2, 3, 4, 5, 3, 2, 1];

// Set数据结构中的每一项都是唯一的（类数组）
arr = [...new Set(arr)];
console.log(arr);
arr = Array.from(new Set(arr));
console.log(arr);

// 传统对象结构中 键不能是对象
let n = {
    x: 10
};
let obj = {
    id: 1
};
obj[n] = 10;

// map支持属性名是对象
let n = {
    x: 10
};
let obj = new Map();
obj.set(n, 10);
```

### 58、对象的深克隆

``` javascript
function _deepClone(_obj) {

    if (_obj === null) return null
    if (typeof _obj !== 'object') return _obj
    if (_obj instanceof Data) return new Data(_obj)
    if (_obj instanceof RegExp) return new RegExp(_obj)

    let newObj = new _obj.constructor
    for (key in _obj) {
        if (_obj.hasOwnProperty(key)) {
            newObj[key] = _deepClone(_obj[key])
        }
    }

    return newObj
}
```

### 60、Js 中的事件队列和事件循环机制

JS本身是单线程的（浏览器只分配一个线程供JS代码自上而下运行） 

> 在JS中大部分操作都是同步编程：当前任务不完成，下一个任务是无法继续执行的，换句话说，任务是逐一执行的

> 但是对于某些特殊的需求，也是需要按照异步编程的思维去处理的

  [浏览器端]

  + 定时器是异步编程

  + JS中的事件绑定是异步编程

  + Ajax/Fetch请求的发送（HTTP事务）

  + Promise设计模式管控异步编程的（包括：async/await...）

  [Node端]

  + progress.nextTick

  + setImmediate

  + FS进行I/O操作可以是异步操作

  ...

JS中异步操作的运行机制：事件队列 Event Queue 和 事件循环 Event Loop

实例一：

``` javascript
let n = 0;

setTimeout(_ => {
    n += 10;
    console.log(n);
}, 1000);
n += 5;

console.log(n);

// 5 15
```

实例二：

``` javascript
setTimeout(() => {
    console.log(1);
}, 20);

console.log(2);

setTimeout(() => {
    console.log(3);
}, 10);

console.log(4);

for (let i = 0; i < 90000000; i++) {
    // do soming  280ms左右
}

console.log(5);

setTimeout(() => {
    console.log(6);
}, 8);

console.log(7);

setTimeout(() => {
    console.log(8);
}, 15);

console.log(9);

// 2 4 5 7 9  3 1 6 8
// 解析：循环结束后，原本放在任务队列中的来两个宏任务都已经到达了执行的条件（但是此时这些任务还是无法执行，因为主栈中的任务还没有执行完，线程还被占用着 => 给定时器设置一个时间，不是到达时间就执行，可能需要延后）

// 所以定时器2 先输入 然后再试定时器1
// 定时器3和4 按定时顺序进行输出
```

![同步异步编程2](https://raw.githubusercontent.com/LuckRain7/images/master/Web-FEDSE/%E5%90%8C%E6%AD%A5%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B2.png)

核心都是ajax操作：JQ中的$.ajax是帮我们封装好的ajax库；axios也是基于Promise封装的ajax库

fetch是浏览器内置的发送请求的类（天生就是Promise管控的）

AJAX的状态：xhr.readyState

* UNSENT 0 创建完XHR默认就是0
* OPENED 1 已经完成OPEN操作
* HEADERS_RECEIVED 2 服务器已经把响应头信息返回了
* LOADING 3 响应主体正在返回中
* DONE 4 响应主体已经返回

XHR. OPEN第三个参数控制的同步异步指的是：从当前SEND发送请求，算任务开始，一直到AJAX状态为4才算任务结束（同步是：在此期间所有的任务都不去处理，而异步是：在此期间该干啥干啥） =>异步在SEND后，会把这个请求的任务放在EventQueue中（宏任务）

``` javascript
let xhr = new XMLHttpRequest;
xhr.open('get', './js/fastclick.js', true);
// console.log(xhr.readyState); //=>1
xhr.onreadystatechange = function() {
    //=>监听到状态改变后才会触发的事件
    console.log(xhr.readyState); //=>2,3,4
};
xhr.send();
```

``` javascript
let xhr = new XMLHttpRequest;
xhr.open('get', './js/fastclick.js', true);
xhr.send();
xhr.onreadystatechange = function() {
    console.log(xhr.readyState);
};

// 2 3 4
```

``` javascript
let xhr = new XMLHttpRequest;
xhr.open('get', './js/fastclick.js', false);
xhr.send();
xhr.onreadystatechange = function() {
    console.log(xhr.readyState);
};

// 
```

``` javascript
let xhr = new XMLHttpRequest;
xhr.open('get', './js/fastclick.js', false);
xhr.onreadystatechange = function() {
    console.log(xhr.readyState);
};
xhr.send();

// 4
```

## 二、AJAX/HTTP 前后端数据交互
