<template lang="">
    <RouteNav></RouteNav>
</template>
<script>
export default {
    data() {
        return {
            data: [
                '洋葱',
                '西红柿',
                '土豆'
            ]
        }
    },
    methods: {
        receive(msg) {
            console.log(msg)
        }
    }
}
</script>
<style lang=""></style>
