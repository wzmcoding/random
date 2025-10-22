// 存储 token(假设后端返回的 token 有效期是 2 小时)
function setToken(token: string, expireSeconds: number = 7200) {
    const data = {
        token,
        expire: Date.now() + expireSeconds * 1000
    }
    localStorage.setItem('authToken', JSON.stringify(data))
}
// 获取 token
function getToken() {
    const tokentStr = localStorage.getItem('authToken')
    if (!tokentStr) {
        return null
    }
    const tokenData = JSON.parse(tokentStr)
    if (Date.now() > tokenData.expire) {
        localStorage.removeItem('authToken') // 清理过期 token
        return null
    }
    return tokenData.token
}

// 使用 token 
const token = getToken()
if (!token) {
    // token 过期或者不存在，跳转到登录页
    window.location.href = '/login'
}