<template lang="">
    <div id="menu">
        <Card
            v-for="item in data"
            :key="item.name"
            @click="turnTo(item)"
            Dynamic
        >
            <div style="display: flex; flex-flow: row nowrap">
                <div style="margin-right: 1em">
                    <img
                        style="margin-top: 8px; width: 32px;"
                        :src="require('../assets/icons/' + item.icon + '.png')"
                        alt="..."
                    />
                </div>
                <p>{{ item.name }}</p>
            </div>
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
            this.$router.push(item.href)
        }
    }
}
</script>
<style>
#menu > * {
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 5px;
    padding-left: 1.5em;
    width: 90%;
    height: 48px;
    line-height: 48px;
    font-weight: bold;
    border-radius: 50px;
    overflow: hidden;
}
</style>
