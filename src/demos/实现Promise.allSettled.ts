/* eslint-disable @typescript-eslint/no-explicit-any */
export function allSettled<T>(promises: Promise<T>[] | any): Promise<any> {
    // 先转换为数组，防止传入非数组(如 Set,arguments)
    promises = [...promises]
    // 如果是空数组，立即 resolve 空结果数组
    if (promises.length === 0) {
        return Promise.resolve([])
    }
    return new Promise((resolve) => {
        // 用于统计已处理的 promise 个数， 无论成功还是失败
        let count = 0
        // 存放每个输入对应的结果对象 { status: 'fulfilled' | 'rejected', value | reason  }
        const results: any[] = []

        promises.forEach((p: T, i: number) => {
            // 遍历每个输入，保留原始顺序下标 i
            Promise.resolve(p) // 强制转换为 Promise（防止非 Promise 输入）
                .then(value => {
                    // 成功时， 填充对应位置的结果为 fulfilled
                    results[i] = { status: 'fulfilled', value }
                }).catch(reason => {
                    // 失败时， 填充对应位置的结果为 rejected
                    results[i] = { status: 'rejected', reason }
                }).finally(() => {
                    // 不论成功或失败都会执行
                    count++
                    if (count === promises.length) {
                        resolve(results)
                    }
                })
        })
    })
}

// 测试用例
const promise1 = Promise.resolve(3)
const promise2 = 42
const promise3 = new Promise((resolve) => {
    setTimeout(resolve, 100, 'foo')
})
const promises = [promise1, promise2, promise3]
allSettled(promises).then((results) => {
    console.log('Promise.allSettled->', results)
})