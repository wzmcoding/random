
class LazyManImpl {
    tasks: (() => void)[]
    constructor(name: string) {
        this.tasks = [] // 初始化任务队列，用来按顺序执行任务
        const task = () => {
            console.log(`Hi, I am ${name}`)
            this.next()  // 执行完当前任务后，触发下一个任务
        }
        this.tasks.push(task)
        // 异步启动任务队列，确保链式调用的方法已全部入队
        setTimeout(() => { this.next() })
    }
    next() {
        // 获取下一个任务
        const task = this.tasks.shift()
        if (task) {
            task()
        }
    }

    sleep(time: number) {
        const task = () => {
            setTimeout(() => {
                console.log(`睡了${time}秒`)
                this.next()
            }, time * 1000)
        }
        this.tasks.push(task)
        return this
    }

    eat(food: string) {
        const task = () => {
            console.log(`吃${food}`)
            this.next()
        }
        this.tasks.push(task)
        return this
    }

    sleepFirst(time: number) {
        const task = () => {
            setTimeout(() => {
                console.log(`睡了${time}秒`)
                this.next()
            }, time * 1000)
        }
        this.tasks.unshift(task)
        return this
    }
}
export function LazyMan(name: string) {
    return new LazyManImpl(name)
}
// 测试用例
// console.log('LazyMan->', LazyMan('zm').sleep(2).eat('午饭').sleepFirst(1).sleep(3).eat('晚饭'))