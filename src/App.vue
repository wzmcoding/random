<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script setup lang="ts">
// import { createCacheRequest } from './场景题';

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

// import { createCancelableTask, TaskScheduler } from './场景题'
// 测试用例
// console.log("开始防竞态请求测试...");

// const { run, cancel } = createCancelableTask(async (num: number) => {
//   console.log(`开始请求 ${num}`);
//   await new Promise(resolve => setTimeout(resolve, 1000));
//   console.log(`请求 ${num} 完成`);
//   return `结果 ${num}`;
// });

// // 连续发送三个请求
// run(1).then(result => {
//   console.log(`请求1结果: ${result}`);
// }).catch(err => {
//   console.log(`请求1被取消`);
// });

// run(2).then(result => {
//   console.log(`请求2结果: ${result}`);
// }).catch(err => {
//   console.log(`请求2被取消`);
// });

// run(3).then(result => {
//   console.log(`请求3结果: ${result}`);
// }).catch(err => {
//   console.log(`请求3被取消`);
// });

// console.log("注意: 只有最后一个请求(请求3)会成功完成，前两个会被自动取消");
//创建一个最大并发数为2的调度器实例
// const scheduler = new TaskScheduler(2)
// // 创建一个延迟函数
// function delay(time: number) {
//   return new Promise(resolve => setTimeout(resolve, time))
// }
// // 开始计时
// console.time('分片1')
// console.time('分片2')
// console.time('分片3')
// console.time('分片4')
// console.time('分片5')

// // 添加5个任务到调度器
// // 由于并发限制为2，这些任务会分批执行：
// // 第一批：分片1和2同时执行，1秒后完成
// // 第二批：分片3和4同时执行，2秒后完成
// // 第三批：分片5单独执行，3秒后完成
// scheduler.addTask(() => delay(1000).then(() => console.timeEnd('分片1完成'))) // 1秒后输出分片1完成
// scheduler.addTask(() => delay(1000).then(() => console.timeEnd('分片2完成'))) // 1秒后输出分片2完成
// scheduler.addTask(() => delay(2000).then(() => console.timeEnd('分片3完成'))) // 2秒后输出分片3完成
// scheduler.addTask(() => delay(2000).then(() => console.timeEnd('分片4完成'))) // 2秒后输出分片4完成
// scheduler.addTask(() => delay(3000).then(() => console.timeEnd('分片5完成'))) // 3秒后输出分片5完成



// 测试用例
// const mockApi = (arg: any) => {
//   console.log('执行API调用，参数:', arg);
//   return Promise.resolve(`结果: ${arg}`);
// };

// const cachedRequest = createCacheRequest(mockApi, 1000);

// console.log('=== 第一次调用 ===');
// cachedRequest('test').then(result => console.log('第一次结果:', result));

// console.log('=== 第二次相同参数调用 ===');
// cachedRequest('test').then(result => console.log('第二次结果:', result));

// console.log('=== 第三次不同参数调用 ===');
// cachedRequest('other').then(result => console.log('第三次结果:', result));

// setTimeout(() => {
//   console.log('=== 1秒后再次调用相同参数 ===');
//   cachedRequest('test').then(result => console.log('第四次结果:', result));
// }, 1500);

// === 第一次调用 ===
// 执行API调用，参数: test
// === 第二次相同参数调用 ===
// === 第三次不同参数调用 ===
// 执行API调用，参数: other
// 第一次结果: 结果: test
// 第二次结果: 结果: test
// 第三次结果: 结果: other
// === 1秒后再次调用相同参数 ===
// 执行API调用，参数: test
// 第四次结果: 结果: test
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
