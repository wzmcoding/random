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
console.log("开始防竞态请求测试...");

const { run, cancel } = createCancelableTask(async (num: number) => {
  console.log(`开始请求 ${num}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`请求 ${num} 完成`);
  return `结果 ${num}`;
});

// 连续发送三个请求
run(1).then(result => {
  console.log(`请求1结果: ${result}`);
}).catch(err => {
  console.log(`请求1被取消`);
});

run(2).then(result => {
  console.log(`请求2结果: ${result}`);
}).catch(err => {
  console.log(`请求2被取消`);
});

run(3).then(result => {
  console.log(`请求3结果: ${result}`);
}).catch(err => {
  console.log(`请求3被取消`);
});

console.log("注意: 只有最后一个请求(请求3)会成功完成，前两个会被自动取消");
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
