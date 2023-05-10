import Vue from 'vue';
import App from './App.vue';
// ElementUI引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
// vue-router引入
import router from './router';
// vuex引入
import store from './store';
// 加载页面样式引入
import 'nprogress/nprogress.css'
// 全局注入组件
import './plugin/directive'
// 系统工具类
import * as utils from './utils/util';
// 系统表单验证工具类
import * as RegExp from './utils/validate';
// http 请求封装
import http from './http/request'
// echarts引入
import * as echarts from 'echarts';
// elementUI样式重写
import './style/element-reset.css';
// 默认样式重写
import './style/base-reset.css'
import './style/common.css'

Vue.use(ElementUI, {size: 'mini'});
// 加载全局封装组件
import './components';

// require('./mock/mock'); // mock模拟请求数据，生产环境记得注释掉

Vue.config.productionTip = false; // 消息提示的环境配置开发环境-生产环境

Vue.prototype.$utils = utils; // 系统工具类
Vue.prototype.$RegExp = RegExp; // Form表单正则验证集合
Vue.prototype.$http = http; // http请求封装
Vue.prototype.$echarts = echarts; // echart请求封装
Vue.prototype.$bus = new Vue(); // 消息总线

window.vm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

