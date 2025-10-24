type EffectFN = () => void

let activeEffect: EffectFN | null

export function effect(fn: EffectFN) {
    // 在 fn 执行之前，将 fn 赋值给 activeEffect， 确保在 get 中可以收集到依赖
    activeEffect = fn
    fn()
    // 执行完 fn 后，将 activeEffect 置为 null, 避免后续的 get 操作收集到错误的依赖
    activeEffect = null
}


class RefImpl<T> {
    _value: T
    // 保存所有的订阅者
    effects = new Set<EffectFN>()
    constructor(val: T) {
        this._value = val
    }

    get value() {
        if (activeEffect) {
            // 如果当前有 activeEffect, 表示有依赖需要收集
            this.effects.add(activeEffect)
        }
        return this._value
    }
    set value(newValue) {
        this._value = newValue
        // 更新完成后，执行所有的订阅者
        this.effects.forEach((effect: EffectFN) => effect())
    }
}


export function ref<T>(val: T) {
    return new RefImpl(val)
}

const count = ref<number>(0)
effect(() => {
    console.log('effect 运行了', count.value)
})

setTimeout(() => {
    count.value++ // 会重新执行 effect
}, 1000)