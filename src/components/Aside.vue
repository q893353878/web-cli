<template>
    <div style="height: 100%;">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu router :default-active="$route.path"
                     text-color="#bfcbd9"
                     background-color="#06272C"
                     :unique-opened="false"
                     :collapse="isCollapse"
                     :collapse-transition="true">
                <template v-for="(route,index) in menusArr">
                    <el-menu-item v-if="!hasChild(route)" :key="index" :index="route.path"
                                  style="height: 56px;line-height: 56px;">
                        <i class="el-icon-location"></i>
                        <span slot="title">{{ route.title }}</span>
                    </el-menu-item>
                    <el-submenu v-else :key="index" :index="route.path">
                        <template slot="title">
                            <i class="el-icon-setting"></i>
                            <span slot="title">{{ route.title }}</span>
                        </template>
                        <template v-for="(subRoute,subIndex) in route.children">
                            <el-menu-item :key="subIndex" :index="route.path + '/' + subRoute.path">{{subRoute.title }}
                            </el-menu-item>
                        </template>
                    </el-submenu>
                </template>
            </el-menu>
        </el-scrollbar>
    </div>
</template>
<script>
    export default {
        components: {},
        data() {
            return {
                activeMenu: '0', // 记录当前选中菜单项
                menusArr: [] // 存储所有目录菜单信息
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.getMenusArr()
            })
        },
        props: ['isCollapse'],
        methods: {
            /**
             * 判断是否含有子元素的方法
             * */
            hasChild(route) {
                if (route.hasOwnProperty('children') && route.children != 0) {
                    return true
                } else {
                    return false;
                }
            },

            /**
             * 获取目录菜单
             * */
            getMenusArr: function () {
                let arr = this.$router.options.routes
                arr.forEach(item => {
                    if (item.path != '/' && item.path != '/login' &&
                        item.path != '/403' && item.path != '*') {
                        this.menusArr.push(item)
                    }
                })
            }
        }
    }
</script>
<style lang="less" scoped>

    img {
        width: 26px;
        height: 24px;
        padding-right: 20px;
    }
</style>
