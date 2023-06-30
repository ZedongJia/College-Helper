<template lang="">
    <div id="menu">
        <Card v-for="item in data" :key="item.name" @click="turnTo(item)" Dynamic>
            {{ item.name }}
        </Card>
    </div>
</template>
<script>
export default {
    props: {
        data: Array
    },
    methods: {
        turnTo(item) {
            // todo
        }
    }
}
</script>
<style>
#menu> *{
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 5px;
    padding-left: 2em;
    width: 90%;
    height: 48px;
    line-height: 48px;
    font-weight: bold;
    border-radius: 50px;
    overflow: hidden;
}
</style>
