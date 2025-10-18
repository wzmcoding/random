class EventBus {
    events: Record<string, Set<() => void>> = {}
    on(eventName: string, cb: (...args: unknown[]) => void) {
        // if(!this.events[eventName]) {
        //     this.events[eventName] = new Set()
        // } else {
        //     this.events[eventName] = this.events[eventName].add(cb)
        // }
        // this.events[eventName] = (this.events[eventName] ?? new Set()).add(cb)
        (this.events[eventName] ??= new Set()).add(cb)
    }

    emit(eventName: string, ...args: unknown[]) {
        this.events[eventName]?.forEach((cb: (...args: unknown[]) => void) => cb(...args))
    }
    once(eventName: string, cb: (...args: unknown[]) => void) {
        const wrapper = () => {
            cb()
            this.off(eventName, wrapper)
        }
        wrapper()
    }
    off(eventName: string, cb: (...args: unknown[]) => void) {
        this.events[eventName]?.delete(cb)
    }
}

export const bus = new EventBus()