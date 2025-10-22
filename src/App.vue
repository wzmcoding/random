<script setup lang="ts">
// 数组去重
// import { unique, unique2, unique3, unique4, unique5 } from './demos'
// import Child from './ChildComponent.vue'
// import HelloWorld from './HelloWorld.vue';
// console.log('unique(1, 2, 2, 3, 4, 4, 5)->', unique(1, 2, 2, 3, 4, 4, 5))
// console.log('unique2(1, 2, 2, 3, 4, 4, 5)->', unique2(1, 2, 2, 3, 4, 4, 5))
// const arr = [
//   {
//     id: 1,
//     name: '张三'
//   },
//   {
//     id: 2,
//     name: '李四'
//   },
//   {
//     id: 2,
//     name: '赵六'
//   },
//   {
//     id: '1',
//     name: '王五'
//   },
// ]
// console.log('unique3(arr, "name")->', unique3(arr, 'name'))
// console.log('unique3(arr, "id")->', unique3(arr, 'id'))
// console.log('unique4(arr, "name")->', unique4(arr, 'id'))
// console.log('unique5(arr, "name")->', unique5(arr, (item) => item.id))

import { createCancelableTask } from './场景题'
// 测试用例
const { run, cancel } = createCancelableTask(async (num: number) => {
  console.log('开始请求', num)
  await new Promise(resolve => setTimeout(resolve, 3000))
})
run(1)
run(2)
run(3)
</script>

<script lang="ts">
// 数组去重
</script>

<template>
  <h1>You did it!</h1>
  <Child />
  <HelloWorld />
</template>

<style scoped></style>
