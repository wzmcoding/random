/* eslint-disable @typescript-eslint/no-explicit-any */
export function myInstanceof(target: any, constructor: any): boolean {
    if (typeof target !== 'object' || target === null) {
        // 检查 target 是否为对象类型且不为 null， 如果不是，则返回 false
        return false
    }
    // 获取 constructor 的原型对象
    const prototype = constructor.prototype
    // 获取 target 的原型对象
    let proto = Object.getPrototypeOf(target)
    // 沿着原型链向上查找
    while (proto) {
        // 找到了 constructor 的原型对象
        if (proto === prototype) {
            return true
        }
        // 继续向上查找
        proto = Object.getPrototypeOf(proto)
    }
    // 到达原型链顶端，返回 false
    return false
}
// 测试用例
class Person { }
class Student extends Person { }
const student = new Student()
console.log('myInstanceof', myInstanceof(student, Student)) // true
console.log('myInstanceof', myInstanceof(student, Person)) // true
console.log('myInstanceof', myInstanceof(student, Array)) // false