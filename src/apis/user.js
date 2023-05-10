// 接口封装js
import request from '../http/request.js'

// 用户登录
export function login(params) {
    return request.windPost('/apis/login', params)
}
