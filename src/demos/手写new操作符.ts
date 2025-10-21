/* eslint-disable @typescript-eslint/no-explicit-any */
export function myNew(Constructor: any, ...args: any[]) {
    // 创建一个空对象 (新实例的载体)
    const obj = {}
    // 将空对象的原型指向构造函数的 prototype， 保证 instanceof 等行为
    Object.setPrototypeOf(obj, Constructor.prototype)
    // 执行构造函数， 把this 绑定到新对象上
    const result = Constructor.apply(obj, args)
    // 若构造函数显式返回对象，则返回该对象， 否则返回新创建的对象
    return typeof result === 'object' && result !== null ? result : obj
}
// 测试用例
function Person(name: string) {
    this.name = name
}

const p = myNew(Person, '张三')
console.log('myNew ->', p instanceof Person) // true
console.log('myNew ->', p.name) // 张三
console.log('myNew ->', p.__proto__ === Person.prototype) // true