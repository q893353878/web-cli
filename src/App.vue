<template>
    <div class="app">
        <router-view v-if="isRouterAlive"></router-view>
    </div>
</template>

<script>
    export default {
        name: 'App',
        provide() {
            return {
                reload: this.reload
            };
        },
        data() {
            return {
                isRouterAlive: true,
            };
        },
        destroyed() {

        },
        mounted() {

        },
        methods: {
            /**
             * 重载页面
             * */
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(() => {
                    this.isRouterAlive = true;
                });
            }
        }
    };
</script>

<style>
    .app{
        width: 100vw;
        height: 100vh;

        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
</style>
