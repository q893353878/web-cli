<template>
    <div class="page-title">
        <h1 style="color: red;">我是页头head</h1>
    </div>
</template>
<script>
    export default {
        name: 'headerComponent',
        data() {
            return {}
        },
        destroyed() {

        },
        mounted() {

        },
        methods: {}
    }
</script>
<style lang="less" scoped>
    .page-title {
        height: 100%;
        background-color: #06262C;
        text-align: center;
    }
</style>
