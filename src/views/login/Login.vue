<template>
    <div class="all-content">
        <h1 @click="loginBtn">我是登录页</h1>
    </div>
</template>
<script>

    export default {
        components: {},
        data() {
            return {};
        },
        mounted() {

        },
        methods: {
            loginBtn() {
                this.$router.push('/home')
            }
        }
    }
</script>
<style scoped lang="less">
    .all-content {
        text-align: center;
    }
</style>
