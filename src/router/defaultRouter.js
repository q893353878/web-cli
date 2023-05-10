const Forbidden = r => require.ensure([], () => r(require('@/views/error/403.vue')), '403');
const NotFound = r => require.ensure([], () => r(require('@/views/error/404.vue')), '404');
const Login = r => require.ensure([], () => r(require('@/views/login/Login.vue')), 'login');
const layout = r => require.ensure([], () => r(require('@/viewLayout/main.vue')), 'main');

/* Router Modules */
import systemManageRouter from './modules/systemManage.js'

const defaultRouter = [{
    path: '/',
    redirect: {
        name: 'loginPage'
    }
},
{
    path: '/login', // 登录页 -- 用户登录鉴权
    component: Login,
    name: 'loginPage'
},
{
    path: '/home',
    component: layout, // 首页
    name: 'homePage',
    title: '首页',
    menuCode: '0001'
},
{
    path: '/systemManagement',
    component: layout,
    name: 'systemManagement',
    title: '系统管理',
    menuCode: '0600',
    children: systemManageRouter
},
{
    path: '/403',
    component: Forbidden
},
{
    path: '*',
    component: NotFound
}
]

export default defaultRouter;
