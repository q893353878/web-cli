const notFound = () => import('@/views/error/404.vue');
// const userManagement = () => import('@/views/systemManagement/userManagement/UserManage.vue');
const systemManageRouter = [
    // {
    //     path: 'user',
    //     component: userManagement,
    //     name: 'userPage',
    //     title: '用户管理',
    //     menuCode: '0601'
    // },
    {
        path: 'role',
        component: notFound,
        name: 'notFoundPage',
        title: '角色权限',
        menuCode: '0602'
    }
]

export default systemManageRouter
