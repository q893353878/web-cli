<template>
    <div class="main-page">
        <el-header style="height: 8vh;padding: 0;" :class=" isLogError ? 'alarm-animation' : '' ">
            <self-header></self-header>
        </el-header>
        <el-container style="position:relative;height: 92vh;">
            <el-aside class="menu-dev" :class="[isCollapse ? 'short-width' : 'normal-width']"
                      v-if="this.fullscreen === false">
                <self-aside :isCollapse="isCollapse"></self-aside>
            </el-aside>
            <transition name="fade">
                <el-main style="height:100%;overflow: hidden;">
                    <template v-if="this.$route.name === 'homePage'">
                        <home-page />
                    </template>
                    <template v-else>
                        <router-view></router-view>
                    </template>
                </el-main>
            </transition>
        </el-container>
    </div>
</template>
<script>
    import HomePage from '@/views/home/Home.vue'

    export default {
        name: 'home',
        components: {HomePage},
        data() {
            return {
                isCollapse: false, // 表示展开或闭合状态
                fullscreen: false,
                isLogError: false
            }
        },
        mounted() {
            this.$nextTick(() => {

            })
        },
        destroyed() {

        },
        methods: {

        }
    };
</script>
<style lang="less">
    .main-page {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .menu-dev {
            position: relative;
            background: #06262C;
            box-shadow: 2px 0px 0px 0px rgba(14, 166, 172, 0.3);

            .arrow-img {
                position: absolute;
                right: -24px;
                top: 0;
                width: 24px;
                height: 66px;
                z-index: 1000;
                cursor: pointer;
            }
        }

        .alarm-div {
            position: absolute;
            right: 10px;
            top: 4px;
            /*border: 1px solid red;*/
            width: inherit;
            max-width: 30%;
            height: 48px;
            color: coral;
            font-size: 14px;
            /*letter-spacing: 2px;*/
            line-height: 48px;
        }
    }

    .el-aside {
        overflow: visible;
    }

    .el-menu-item:focus, .el-menu-item:hover {
        background-color: #649598 !important;
    }

    .el-menu--popup-right-start {
        border: 1px solid #3ae4ef !important;
        box-shadow: 2px 0px 0px 0px rgba(14, 166, 172, 0.3);
    }

    .normal-width {
        width: 200px !important;
    }

    .short-width {
        width: 68px !important;
    }

</style>
