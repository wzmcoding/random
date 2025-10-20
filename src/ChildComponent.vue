<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
import { ref } from 'vue'
import { bus, curry, arrayToTree, arr1, debounceWithPromise, throttle, myInstanceof } from './demos';
import { sleep } from './demos/sleep函数';
import { deepClone } from './demos/deepClone支持循环引用';
import { allSettled } from './demos/实现Promise.allSettled';
import { LazyMan } from './demos/实现LazyMan链式调用';

const count = ref(0)
bus.on('increment', (val: number) => {
    count.value += val
})
// 测试用例
console.log(curry(function (a: number, b: number, c: number) {
    return a + b + c
})(1)(2)(3))
// 其它测试用例
console.log(curry(function (a: number, b: number) {
    return a + b
})(1)(2))


console.log('arrayToTree->', arrayToTree(arr1))

// 防抖
const debounce = debounceWithPromise(function (a: number, b: number) {
    console.log('debounce->', a, b)
    return a + b
}, 1500)
setTimeout(() => {
    debounce(1, 1)
    debounce(2, 2)
    const res = debounce(1, 2)
    res.then((result: unknown) => {
        console.log('debounce result->', result)
    })
}, 1000)

// 节流
const throttleFn = throttle(function (a: number, b: number) {
    console.log('throttle->', a, b)
    return a + b
}, 1500)
setTimeout(() => {
    const res = throttleFn(1, 1)
    throttleFn(2, 2)
    throttleFn(1, 2)
    res.then((result: unknown) => {
        console.log('throttle result->', result)
    })
}, 1000)

// sleep 函数测试
async function fn() {
    await sleep(2000)
    console.log('2秒后执行')
}
fn()
// instanceof 测试
// 测试用例
class Person { }
class Student extends Person { }
const student = new Student()
console.log('myInstanceof', myInstanceof(student, Student)) // true
console.log('myInstanceof', myInstanceof(student, Person)) // true
console.log('myInstanceof', myInstanceof(student, Array)) // false

// deepClone 测试
// 测试用例
const obj: any = {
    a: {
        b: {
            c: 1
        },
        d: new Date(),
        e: /abc/g,
    },
}
obj.a['f'] = obj // 创建循环引用
console.log('deepClone', deepClone(obj))

// allSettled 测试用例
const promise1 = Promise.resolve(3)
const promise2 = 42
const promise3 = new Promise((resolve) => {
    setTimeout(resolve, 100, 'foo')
})
const promises = [promise1, promise2, promise3]
allSettled(promises).then((results) => {
    console.log('Promise.allSettled->', results)
})

// lazyMan 测试用例
console.log('LazyMan->', LazyMan('zm').sleep(2).eat('午饭').sleepFirst(1).sleep(3).eat('晚饭'))
</script>

<template>
    <div>
        <h2>Child Component</h2>
        <p>Count: {{ count }}</p>
    </div>
</template>