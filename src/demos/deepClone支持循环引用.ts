/* eslint-disable @typescript-eslint/no-explicit-any */
export function deepClone<T = any>(obj: any, map = new WeakMap()): T {
    // 基本类型或者 null 直接返回
    if (obj === null || typeof obj !== 'object') {
        return obj
    }
    // 如果当前对象已拷贝过，直接返回它的副本， 避免无限递归
    if (map.has(obj)) {
        return map.get(obj)
    }
    let cloneObj: any
    if (obj instanceof Date) {
        cloneObj = new Date(obj)
    } else if (obj instanceof RegExp) {
        cloneObj = new RegExp(obj.source, obj.flags)
    }
    else {
        // 根据被拷贝对象的类型（数组/普通对象）创建对应的容器
        cloneObj = Array.isArray(obj) ? [] : {}
        // 将 [原对象 => 副本] 存入 WeakMap 中，避免循环引用
        map.set(obj, cloneObj)

        // 遍历对象所有自身属性
        Reflect.ownKeys(obj).forEach(key => {
            cloneObj[key] = deepClone(obj[key], map)
        })
    }
    return cloneObj
}

// 测试用例
const obj: any = {
    a: {
        b: {
            c: 1
        },
        d: new Date(),
        e: /abc/g,
    },
}
obj.a['f'] = obj // 创建循环引用
console.log('deepClone', deepClone(obj))