/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * 假设我们要上传一个20GB的大文件，将其分成100个10MB的分片。如果不使用任务调度器，同时发起100个上传请求会导致以下问题： 
 * 1.浏览器的并发请求数量被占满 
 * 2.其他正常业务请求可能无法及时发送 
 * 3.服务器压力过大 
 * 4.网络带宽被占满
 * 那么这个问题我们应该如何解决呢？
 * 我们可以尝试着将所有的任务，都放到一个队列里面去，
 * 这样我们每次最多发送两个请求，如果有一个请求发送完成，那么我们再从这个队列里面取出一个发送请求，
 * 我们只需要保证同时发送的请求不超过两个，这样就可以保证并发数量不被占满，也不会占用过多的带宽，下面我们来实现这个功能
 */

/**
 * 任务调度器类
 * 用于控制并发任务的执行数量
 * 实现了任务队列和并发限制的功能
 */
export class TaskScheduler {
    // 存储待执行的任务队列
    tasks: any[] = []
    // 当前正在执行的任务数量
    runningCount = 0
    // 最大并发限制数
    limit: number

    constructor(limit: number) {
        this.limit = limit
    }

    /**
     * 执行任务
     * 检查是否可以执行新的任务，并从任务队列中取出任务执行
     * 任务执行完成后会检查队列中是否还有待执行的任务，如果有则继续执行
     */
    run() {
        if (this.runningCount >= this.limit || this.tasks.length <= 0) {
            // 如果当前运行的任务数达到上限或者任务队列为空，则不执行新任务
            return
        }
        this.runningCount++
        // 从队列头部取出一个任务
        const task = this.tasks.shift()
        // 执行任务，任务执行完成后递归执行 run 函数
        task().finally(() => {
            // 减少运行中的任务计数
            this.runningCount--
            // 检查是否还有任务可以执行
            this.run()
        })
    }

    /**
     * 添加新任务到调度器
     */
    addTask(task: any) {
        return new Promise((...args: any[]) => {
            // 将任务包装后添加到队列
            this.tasks.push(() => task().then(...args))
            // 立即执行任务
            this.run()
        })
    }
}

//创建一个最大并发数为2的调度器实例
const scheduler = new TaskScheduler(2)
// 创建一个延迟函数
function delay(time: number) {
    return new Promise(resolve => setTimeout(resolve, time))
}
// 开始计时
console.time('分片1')
console.time('分片2')
console.time('分片3')
console.time('分片4')
console.time('分片5')

// 添加5个任务到调度器
// 由于并发限制为2，这些任务会分批执行：
// 第一批：分片1和2同时执行，1秒后完成
// 第二批：分片3和4同时执行，2秒后完成
// 第三批：分片5单独执行，3秒后完成
scheduler.addTask(() => delay(1000).then(() => console.timeEnd('分片1'))) // 1秒后输出分片1
scheduler.addTask(() => delay(1000).then(() => console.timeEnd('分片2'))) // 1秒后输出分片2
scheduler.addTask(() => delay(2000).then(() => console.timeEnd('分片3'))) // 2秒后输出分片3
scheduler.addTask(() => delay(2000).then(() => console.timeEnd('分片4'))) // 2秒后输出分片4
scheduler.addTask(() => delay(3000).then(() => console.timeEnd('分片5'))) // 3秒后输出分片5
// 打印
// 分片1: 1017.328857421875 ms
// 分片2: 1017.73486328125 ms
// 分片3: 3029.158935546875 ms
// 分片4: 3029.530029296875 ms
// 分片5: 6035.072021484375 ms