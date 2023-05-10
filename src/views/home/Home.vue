<template>
    <div class="content-container">
        <div style="width: 100%;height: 100%;">
            <h1 style="color: #3ae4ef;text-align: center;">我是内容区域</h1>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'Home',
        components: {},
        props: [],
        computed: {},
        data() {
            return {}
        },
        mounted() {
            this.$nextTick(() => {

            })
        },
        destroyed() {

        },
        methods: {}
    }
</script>

<style scoped lang="less">
    .content-container {
        height: 100%;
        width: 100%;
        background-color: #143e4a;
    }

</style>
