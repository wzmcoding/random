/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 作用：在一定时间内，多次触发同一个函数，只执行最后一次
 * 适用场景： 搜索框输入、窗口resize等频繁触发的事件
 * @param fn - 需要防抖的函数
 * @param delay - 延迟时间，默认300ms
 * @returns - 防抖后的函数
 */
export function debounce<T = any>(fn: (...args: T[]) => T, delay: number = 300): (...args: T[]) => void {
    let timer: ReturnType<typeof setTimeout> | null = null
    return function (...args: T[]): void {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}

// 正常情况，我们是不能拿到防抖函数的返回值的，因为它是异步的，如果需要拿到返回值，可以使用 Promise 包装一下
export function debounceWithPromise<T = any>(fn: (...args: T[]) => T, delay: number = 300): (...args: T[]) => Promise<T> {
    let timer: ReturnType<typeof setTimeout> | null = null
    return function (...args: T[]): Promise<T> {
        if (timer) {
            clearTimeout(timer)
        }
        // 返回一个 Promise 来记录结果
        return new Promise((resolve: any, reject: any) => {
            timer = setTimeout(() => {
                try {
                    const res = fn.apply(this, args)
                    resolve(res) // 执行成功， resolve 函数的返回值
                } catch (error) {
                    reject(error) // 执行期间报错，reject
                }
            }, delay)
        })
    }
}