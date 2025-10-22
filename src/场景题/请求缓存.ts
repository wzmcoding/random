/* eslint-disable @typescript-eslint/no-explicit-any */
export function defaultGenKey(options: any) {
    return JSON.stringify(options)
}
// `createCacheRequest`是一个高阶函数，用于为异步请求创建一个临时的缓存层。
// 它可以在指定的时间内缓存相同的请求结果，从而避免重复请求，提高应用性能。
export function createCacheRequest<T = any>(fn: (...args: T[]) => Promise<T> | any, ms: number = 0, generatorKey = defaultGenKey) {
    const map: Record<string, Promise<any>> = {}
    return (...args: T[]) => {
        // 生成唯一key,如果用户没有传递，则使用 JSON.stringify 进行序列化
        const key = generatorKey(args)
        // 如果缓存中存在则直接返回，否则执行函数并缓存结果，最后在指定时间后删除缓存
        return (map[key] ??= fn(...args)).finally(() => {
            setTimeout(() => delete map[key], ms)
        })
    }
}
// 测试用例
const mockApi = (arg: any) => {
    console.log('执行API调用，参数:', arg);
    return Promise.resolve(`结果: ${arg}`);
};

const cachedRequest = createCacheRequest(mockApi, 1000);

console.log('=== 第一次调用 ===');
cachedRequest('test').then(result => console.log('第一次结果:', result));

console.log('=== 第二次相同参数调用 ===');
cachedRequest('test').then(result => console.log('第二次结果:', result));

console.log('=== 第三次不同参数调用 ===');
cachedRequest('other').then(result => console.log('第三次结果:', result));

setTimeout(() => {
    console.log('=== 1秒后再次调用相同参数 ===');
    cachedRequest('test').then(result => console.log('第四次结果:', result));
}, 1500);

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