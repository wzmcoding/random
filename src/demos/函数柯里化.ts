/* eslint-disable @typescript-eslint/no-explicit-any */
export function curry<T = any>(fn: (...args: T[]) => T): any {
    const arity = fn.length
    console.log('arity->', arity)
    function _curried<T = any>(...args: T[]): any {
        return function (...nextArgs: T[]): any {
            const allArgs = [...args, ...nextArgs] as any[]
            if (allArgs.length >= arity) {
                return fn.apply(this, allArgs)
            } else {
                return _curried(...allArgs)
            }
        }
    }

    return _curried
}
