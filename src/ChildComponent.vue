<script setup lang="ts">
import { ref } from 'vue'
import { bus, curry } from './demos';

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
</script>

<template>
    <div>
        <h2>Child Component</h2>
        <p>Count: {{ count }}</p>
    </div>
</template>