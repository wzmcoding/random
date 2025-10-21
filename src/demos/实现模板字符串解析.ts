/* eslint-disable @typescript-eslint/no-explicit-any */
// render 接收模板字符串和数据对象，返回解析后的结果
export function render(template: string, data: any) {
    // 匹配模板字符串中的变量名
    return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
        console.log('_, key ->', { _, key }) // {_: '{{name}}', key: 'name'}   {_: '{{count}}', key: 'count'}
        // 取 data 中对应的值，若为 null/undefined 则返回空字符串
        return data[key] ?? ''
    })
}
console.log(render('你好 {{name}}, 你有{{count}}条消息', {
    name: '张三',
    count: 12
})) // 打印： 你好 张三, 你有12条消息