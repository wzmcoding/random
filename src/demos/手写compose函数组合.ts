/* eslint-disable @typescript-eslint/no-explicit-any */
// 接收若干个函数，按从右到左的顺序组合
export function compose(...fns: any[]) {
    // 返回一个新函数，接收初始值
    return function (init: any) {
        // 从右到左执行： 把上一次结果作为下一个函数的入参
        return fns.reduceRight((val, fn) => fn(val), init)
    }
}
const add = (x: number) => x + 1
const mul = (x: number) => x * 2
const fn = compose(add, mul)
console.log('compose -> ', fn(5)) // (5 * 2) + 1 = 11