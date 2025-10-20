<script setup lang="ts">
import { ref } from 'vue'
import { bus, curry, arrayToTree, arr1, debounceWithPromise } from './demos';

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
</script>

<template>
    <div>
        <h2>Child Component</h2>
        <p>Count: {{ count }}</p>
    </div>
</template>