# 实验室技术支撑平台

### ltp-web
基于前后端分离，工程名称与后端相应业务工程名称对齐，后面缀上-web <br>
要求前端项目名称全部小写，单词之间用拼接线（-）

## 安装依赖
```
1、配置npm淘宝镜像（若配置过则跳过该步骤）
npm config set registry https://registry.npm.taobao.org
2、安装依赖
npm install 
```

### 开发模式
```
npm run dev / npm start
```

### 打包测试环境
```
npm run test
```

### 测试和生产一起打包
```
npm run publish
```

### 打包生产环境
```
npm run build
```

### 项目配置功能
1. 开启Gzip压缩，包含文件js、css
2. 去掉注释、去掉console.log
3. 压缩图片
4. 本地代理
5. 设置别名，vscode也能识别
6. 配置环境变量开发模式、测试模式、生产模式
7. 请求路由动态添加
8. axios配置
9. 添加mock数据
10. 配置全局less
11. 只打包改变的文件 


### 附加功能
1. vue如何刷新当前页面
2. 封装WebSocket
3. 增加指令directive
4. 增加本地代码规范自检功能

### 目录结构
```shell
├── public                      静态模板资源文件
├── src                         项目文件
├──|── apis                     接口相关封装 
├──|── assets                   静态文件 img 、css 、js   
├──|── components               全局组件
├──|── http                     请求配置
├──|── viewLayout               布局文件
├──|── mock                     测试数据
├──|── plugin                   插件
├──|── router                   路由
├──|── store                    vuex数据管理
├──|── utils                    工具文件
├──|── views                    页面文件
├──|── App.vue                  vue入口文件
├──|── main.js                  vue初始化
├── .env.development            开发模式配置
├── .env.production             正式发布模式配置
├── .env.test                   测试模式配置
├── .env.test                   测试模式配置
├── vue.config.js               config配置文件
```



### 开启Gzip压缩，包含文件js、css
```js
new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: /\.(js|css)$/, // 匹配文件名
      threshold: 10000, // 对超过10k的数据压缩
      deleteOriginalAssets: false, // 不删除源文件
      minRatio: 0.8 // 压缩比
})
```
### 去掉注释、去掉console.log
安装`cnpm i uglifyjs-webpack-plugin -D`
```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
new UglifyJsPlugin({
	uglifyOptions: {
		output: {
			comments: false, // 去掉注释
		},
		warnings: false,
		compress: {
			drop_console: true,
			drop_debugger: false,
			pure_funcs: ['console.log'] //移除console
		}
	}
})
```
### 压缩图片
```js
chainWebpack: config => {
	// 压缩图片
	config.module
		.rule('images')
		.test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
		.use('image-webpack-loader')
		.loader('image-webpack-loader')
		.options({ bypassOnDebug: true })
}
```
### 本地代理
```js
devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8080,
    allowedHosts: 'all',
    hot: true,
    compress: true,
    historyApiFallback: true, // 解决vue-router刷新404问题
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: 'http://192.168.1.114:3000' // 需代理的地址
    }
}
```

### 设置vscode 识别别名
在vscode中插件安装栏搜索 `Path Intellisense` 插件，打开settings.json文件添加 以下代码 "@": "${workspaceRoot}/src"，安以下添加
```json
{
    "workbench.iconTheme": "material-icon-theme",
    "editor.fontSize": 16,
    "editor.detectIndentation": false,
    "guides.enabled": false,
    "workbench.colorTheme": "Monokai",
    "path-intellisense.mappings": {
        "@": "${workspaceRoot}/src"
    }
}
```
在项目package.json所在同级目录下创建文件jsconfig.json
```json
{
    "compilerOptions": {
        "target": "ES6",
        "module": "commonjs",
        "allowSyntheticDefaultImports": true,
        "baseUrl": "./",
        "paths": {
          "@/*": ["src/*"]
        }
    },
    "exclude": [
        "node_modules"
    ]
}
```

### 配置环境变量开发模式、测试模式、生产模式
在根目录新建
#### .env.development
```js
# 开发环境
NODE_ENV='development'

VUE_APP_SSO='http://http://localhost:10001'
```
#### .env.test
```js
NODE_ENV = 'production' # 如果我们在.env.test文件中把NODE_ENV设置为test的话，那么打包出来的目录结构是有差异的
VUE_APP_MODE = 'test'
VUE_APP_SSO='http://http://localhost:10001'
outputDir = test
```
#### .env.production
```js
NODE_ENV = 'production'

VUE_APP_SSO='http://http://localhost:10001'
```
#### package.json
```json
"scripts": {
    "start": "vue-cli-service serve", // 开发模式
    "dev": "vue-cli-service serve", // 开发模式
    "build": "vue-cli-service build", //生产打包
    "lint": "vue-cli-service lint",
    "test": "vue-cli-service build --mode test", // 测试打包
    "publish": "vue-cli-service build && vue-cli-service build --mode test" // 测试和生产一起打包
 }
```
### 请求路由动态添加
在`router/index.js`，核心
```js
router.beforeEach((to, from, next) => {
    const { hasRoute } = store.state; // hasRoute设置一个状态，防止重复请求添加路由
    if (hasRoute) {
        next()
    } else {
        dynamicRouter(to, from, next, selfaddRoutes)
    }
})
```
如果动态添加路由抛警告，路由重复添加，需要添加 `router.matcher = new VueRouter().matcher`

### axios配置
其中响应拦截
```js
const succeeCode = 1; // 成功
/**
 * 状态码判断 具体根据当前后台返回业务来定
 * @param {*请求状态码} status 
 * @param {*错误信息} err 
 */
const errorHandle = (status, err) => {
    switch (status) {
        case 401:
            vm.$message({ message: '你还未登录', type: 'warning' });
            break;
        case 404:
            vm.$message({ message: '请求路径不存在', type: 'warning' });
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
        // 你只需改动的是这个 succeeCode ，因为每个项目的后台返回的code码各不相同
        if (response.data.status === succeeCode) {
            return Promise.resolve(response);
        } else {
            vm.$message({ message: '警告哦，这是一条警告消息', type: 'warning' });
            return Promise.reject(response)
        }
    } else {
        return Promise.reject(response)
    }
}, error => {
    const { response } = error;
    if (response) {
        // 请求已发出，但是不在2xx的范围 
        errorHandle(response.status, response.data.msg);
        return Promise.reject(response);
    } else {
        // 处理断网的情况
        if (!window.navigator.onLine) {
            vm.$message({ message: '你的网络已断开，请检查网络', type: 'warning' });
        }
        return Promise.reject(error);
    }
})
```
在`http/request.js`
```js
import http from './src/http/request'
Vue.prototype.$http = http;
// 使用
this.$http.windPost('url','参数')
```

### 添加mock数据
```js
// xxxx.mock.js
const demoListMock = []
export default {
    'get|/parameter/query': demoListMock
}
```
Mock支持随机数据，具体参看官网列子
http://mockjs.com/examples.html 

### 配置全局less
```js
pluginOptions: {
	// 配置全局less
	'style-resources-loader': {
		preProcessor: 'less',
		patterns: [resolve('./src/style/theme.less')]
	}
}
```
### 只打包改变的文件
安装`cnpm i webpack -D`
```js
const { HashedModuleIdsPlugin } = require('webpack');
configureWebpack: config => {	
	const plugins = [];
	plugins.push(
		new HashedModuleIdsPlugin()
	)
}
```


### vue如何刷新当前页面
刷新当前页面适合在只改变了路由的id的页面，比如查看详情页面，当路由id发生时候，并不会去触发当前页面的钩子函数
查看`App.vue`
```js
<template>
	<div class="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>
<script>
export default {
	name: "App",
	provide() {
		return {
			reload: this.reload
		};
	},
	data() {
		return {
			isRouterAlive: true
		};
	},
	methods: {
        // 重载页面 适合添加数据或者路由id改变
		reload() {
			this.isRouterAlive = false;
			this.$nextTick(()=>{
                this.isRouterAlive = true;
            });
		}
	}
};
</script>
```
然后其它任何想刷新自己的路由页面，都可以这样: `this.reload()`

### 封装WebSocket

具体实例 `utils\websocket.js`

### 本地代码规范自检功能使用
## 以VSCode编辑器为列：

1. 在VSCode编辑器里安装EditorConfig for VS Code，ESLint， Prettier - Code formatter，Stylelint插件

2. 修改 Visual Studio Code 工作区settings.json配置文件，在settings.json文件中添加以下代码：

<script>

</script>
```
{
  "prettier.useEditorConfig": false,
  "prettier.configPath": ".prettierrc.js",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.organizeImports": true,
    "source.fixAll": true,
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["vue", "javascript", "html"],
  "stylelint.validate": ["css", "less", "postcss", "scss", "vue", "sass"],
}
```

完成后，删除node_module包，重新 npm install，然后运行项目，查看本地代码规范检查是否生效

#配置文件说明：

- .eslintrc.js        eslint配置文件，请根据各自的项目要求修改rule规则内容
- .eslintignore
- .prettierrc.json     prettier配置文件，和eslint规则冲突的内容，必须在.prettierrc.json中修改，和eslint规则保持一致
- .prettierignore
- .stylelintrc.js      stylelint配置文件
- .stylelintignore

## 代码检测功能可能存在缺陷说明：
#**问题1已修复，问题2在当前项目模板中已使用stylelint-config-standard@22.0.0版本插件**

#1. 如果样式检查报错：.stylelintrc.js:1 ��m SyntaxError: Invalid or unexpected token at Object.compileFunction (node:vm:352:18) at wrapSafe。。。。；该问题目前尚未解决，检查样式暂时不用，setting设置中移除stylelint.validate": ["css", "less", "postcss", "scss", "vue", "sass"]这项配置。

#2. 如果问题1不存在，样式检查可正常使用，请测试样式代码中的rgba（颜色透明度）的值被格式化后是否异常，如果异常，请对stylelint-config-standard插件做降级处理，目前可用版本22.0.0版本，先卸载插件在重新安装：npm i stylelint-config-standard@22.0.0 -D





