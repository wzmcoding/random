/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 作用：在一定时间内，多次触发同一个函数，只触发一次
 * 适用场景： 
 * @param fn - 需要节流的函数
 * @param delay - 延迟时间，默认300ms
 * @returns - 节流后的函数
 */
export function throttle<T = any>(fn: (...args: T[]) => T, delay: number = 300): (...args: T[]) => Promise<T> {
    let timer: ReturnType<typeof setTimeout> | null = null
    return function (...args: T[]): Promise<T> {
        return new Promise((resolve, reject) => {
            if (!timer) {
                timer = setTimeout(() => {
                    try {
                        const res = fn.apply(this, args)
                        timer = null
                        resolve(res)
                    } catch (error) {
                        reject(error)
                    }
                }, delay)
            }
        })
    }
}