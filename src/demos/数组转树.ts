/* eslint-disable @typescript-eslint/no-explicit-any */
// 数组转树
export function arrayToTree<T = any[]>(arr: T[]) {
    // 用于存储 id -> 节点的映射， O（1）查找任意节点
    const map = new Map<number, any>()
    // 保存根节点引用
    let root: any = null
    // 第一遍： 创建所有节点对象，并挂进map
    arr.forEach((item: any) => {
        // 每个节点初始化 children 数组
        map.set(item.id, { ...item, children: [] })
        // 如果是根节点，记下来
        if (item.parentId === null) {
            root = map.get(item.id)
        }
    })
    // // 第二遍： 建立父子关系
    arr.forEach((item: any) => {
        // 当前节点
        const node = map.get(item.id)
        // 父节点, 可能为 undefined
        const parent = map.get(item.parentId)
        if (parent) {
            // 将当前节点挂到父节点的 children 上
            parent.children.push(node)
        }
    })
    // 返回根节点
    return root
}

// 测试用例1: 标准组织结构数据
export const arr1 = [
    { id: 1, name: '公司', parentId: null },
    { id: 2, name: '技术部', parentId: 1 },
    { id: 3, name: '市场部', parentId: 1 },
    { id: 4, name: '前端组', parentId: 2 },
    { id: 5, name: '后端组', parentId: 2 },
    { id: 6, name: 'UI设计', parentId: 4 },
    { id: 7, name: 'React开发', parentId: 4 },
    { id: 8, name: '数字营销', parentId: 3 },
    { id: 9, name: '品牌推广', parentId: 3 }
];
// 结果
const result =
{
    "id": 1,
    "name": "公司",
    "parentId": null,
    "children": [
        {
            "id": 2,
            "name": "技术部",
            "parentId": 1,
            "children": [
                {
                    "id": 4,
                    "name": "前端组",
                    "parentId": 2,
                    "children": [
                        {
                            "id": 6,
                            "name": "UI设计",
                            "parentId": 4,
                            "children": []
                        },
                        {
                            "id": 7,
                            "name": "React开发",
                            "parentId": 4,
                            "children": []
                        }
                    ]
                },
                {
                    "id": 5,
                    "name": "后端组",
                    "parentId": 2,
                    "children": []
                }
            ]
        },
        {
            "id": 3,
            "name": "市场部",
            "parentId": 1,
            "children": [
                {
                    "id": 8,
                    "name": "数字营销",
                    "parentId": 3,
                    "children": []
                },
                {
                    "id": 9,
                    "name": "品牌推广",
                    "parentId": 3,
                    "children": []
                }
            ]
        }
    ]
}
