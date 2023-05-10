import axios from 'axios';
import merge from 'lodash/merge'
import qs from 'qs'

const success = 200; // 成功

/**
 * 实例化
 * config是库的默认值，然后是实例的 defaults 属性，最后是请求设置的 config 参数。后者将优先于前者
 */
const http = axios.create({
    timeout: 1000 * 30,
    // withCredentials: true, // 表示跨域请求时是否需要使用凭证
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=utf-8'
    },
    // baseURL:'http://192.168.33.170:18712/'
});


/**
 * 请求拦截
 */
http.interceptors.request.use(function (config) {
    let userId = sessionStorage.getItem("userId");
    if (userId) {
        config.headers['userId'] = userId;
    }
    let token = sessionStorage.getItem('token');
    if (token) {
        config.headers['token'] = token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

/**
 * 状态码判断 具体根据当前后台返回业务来定
 * @param {*请求状态码} status
 * @param {*错误信息} err
 */
const errorHandle = (status, response) => {
    console.log(response)
    switch (status) {
        case 305:
            vm.$router.push('/login');
            break;
        case 400:
            vm.$message({
                message: (response.data.errors && response.data.errors[0].defaultMessage) || '',
                type: 'warning',
                duration: 1000 * 10,
                showClose: true
            })
            break;
        case 401:
            break;
        case 404:
            vm.$message({
                message: `请求路径不存在 ${response.request.responseURL}`,
                type: 'warning',
                duration: 1000,
                showClose: true
            });
            break;
        default:
            console.log(err);
    }
}

/**
 * 响应拦截
 */
http.interceptors.response.use(response => {
    if (response.status === 200) {
        if (response.data.status == success) {
            return Promise.resolve(response);
        } else {
            vm.$message({message: response.data.message || response.data, type: 'warning', duration: 1000, showClose: true});
            return Promise.reject(response)
        }
    } else {
        return Promise.reject(response)
    }
}, error => {
    const {response} = error;
    if (response) {
        // 请求已发出，但是不在2xx的范围
        errorHandle(response.status, response);
        return Promise.reject(response);
    } else {
        // 处理断网的情况
        if (!window.navigator.onLine) {
            vm.$message({message: '你的网络已断开，请检查网络', type: 'warning'});
        }
        return Promise.reject(error);
    }
})

/**
 * 请求地址处理
 */
http.adornUrl = (url) => {
    return url;
}

/**
 * get请求参数处理
 * params 参数对象
 * openDefultParams 是否开启默认参数
 */
http.adornParams = (params = {}, openDefultParams = true) => {
    var defaults = {
        t: new Date().getTime()
    }
    return openDefultParams ? merge(defaults, params) : params
}

/**
 * post请求数据处理
 * @param {*} data 数据对象
 * @param {*} openDefultdata 是否开启默认数据?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
http.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
    var defaults = {
        t: new Date().getTime()
    }
    data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
}

/**
 * windPost请求
 * @param {String} url [请求地址]
 * @param {Object} params [请求携带参数]
 */
http.windPost = function (url, params) {
    return new Promise((resolve, reject) => {
        http.post(http.adornUrl(url), params)
            .then(res => {
                resolve(res.data)
            })
            ['catch'](error => {
            reject(error)
        })
    })
}

/**
 * windGet请求
 * @param {String} url [请求地址]
 * @param {Object} params [请求携带参数]
 */
http.windGet = function (url, params) {
    return new Promise((resolve, reject) => {
        http.get(http.adornUrl(url), {params: params})
            .then(res => {
                resolve(res.data)
            })
            ['catch'](error => {
            reject(error)
        })
    })
}

export default http;
