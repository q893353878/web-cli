// 首先引入Mock
const index = require('mockjs');

// 设置拦截ajax请求的相应时间
index.setup({
    timeout: '200-600'
});

let configArray = [];

// 使用webpack的require.context()遍历所有目录及子目录下的mock文件
const files = require.context('.', true, /\.mock\.js$/);
files.keys().forEach((key) => {
    if (key === './index.js') return;
    configArray = configArray.concat(files(key).default);
});

// 注册所有的mock服务
configArray.forEach((item) => {
    for (let [path, target] of Object.entries(item)) {
        let protocol = path.split('|');
        index.mock(new RegExp('^' + protocol[1]), protocol[0], target);
    }
});
