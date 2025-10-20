/**
 * 使用场景： 在异步函数中延迟一段时间再执行
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
}