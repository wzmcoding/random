/* eslint-disable @typescript-eslint/no-explicit-any */
export type CB = (...args: any[]) => void

class EventBus {
    events: Record<string, Set<CB>> = {}

    on(eventName: string, cb: CB) {
        // if(!this.events[eventName]) {
        //     this.events[eventName] = new Set()
        // } else {
        //     this.events[eventName] = this.events[eventName].add(cb)
        // }
        // this.events[eventName] = (this.events[eventName] ?? new Set()).add(cb)
        (this.events[eventName] ??= new Set()).add(cb)
    }

    emit(eventName: string, ...args: any[]) {
        this.events[eventName]?.forEach((cb: CB) => cb(...args))
    }

    off(eventName: string, cb: CB) {
        this.events[eventName]?.delete(cb)
    }

    once(eventName: string, cb: CB) {
        const handler = (...args: any[]) => {
            cb(...args)
            this.off(eventName, handler)
        }
        this.on(eventName, handler)
    }
}

export const bus = new EventBus()