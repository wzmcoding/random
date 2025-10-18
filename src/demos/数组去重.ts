/**
 * 手写题
 */

// 数组去重
// 1. Set
export function unique<T>(...arr: T[]): T[] {
    return [...new Set(arr)]
}

// 2. 使用 include 方法(性能差)  O(n^2)
export function unique2<T>(...arr: T[]): T[] {
    const newArr: T[] = []
    for (const item of arr) {
        // 每个元素都会执行 includes 方法, 如果数组长度为 n, 那么每个元素都会执行 n 次 includes 方法
        if (!newArr.includes(item)) {
            newArr.push(item)
        }
    }
    return newArr
}

// 3. 对象数组根据某个属性去重
export function unique3<T>(arr: T[], key: keyof T): T[] {
    const map = new Map<T[keyof T], T>()

    for (const item of arr) {
        if (!map.has(item[key])) {
            map.set(item[key], item)
        }
    }

    return [...map.values()]
}

// 或者
export const unique4 = <T>(arr: T[], key: keyof T): T[] => {
    const map = new Map<T[keyof T], Boolean>()
    return arr.filter(item => !map.has(item[key]) && map.set(item[key], true))
}

// 更通用的写法
export const unique5 = <T>(arr: T[], fn: (item: T) => T[keyof T]): T[] => {
    const map = new Map<T[keyof T], Boolean>()
    return arr.filter(item => !map.has(fn(item)) && map.set(fn(item), true))
}
