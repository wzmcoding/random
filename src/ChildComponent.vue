<script setup lang="ts">
import { ref } from 'vue'
import { bus, curry, arrayToTree, arr1, debounceWithPromise, throttle } from './demos';
import { sleep } from './demos/sleep函数';

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
</script>

<template>
    <div>
        <h2>Child Component</h2>
        <p>Count: {{ count }}</p>
    </div>
</template>