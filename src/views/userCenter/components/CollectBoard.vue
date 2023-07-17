<template lang="">
    <MessageList :messageDict="historyDict"></MessageList>
</template>
<script>
import MessageList from './MessageList.vue'
export default {
    data() {
        return {
            historyDict: {}
        }
    },
    components: {
        MessageList
    },
    created() {
        // require
        this.historyDict = {
            实体查询: [
                {
                    time: '8:59',
                    type: '实体查询',
                    content: '玉米'
                },
                {
                    time: '8:59',
                    type: '实体查询',
                    content: '玉米'
                },
                {
                    time: '8:59',
                    type: '实体查询',
                    content: '玉米'
                }
            ],
            关系查询: [
                {
                    time: '8:59',
                    type: '关系查询',
                    content: '玉米属于植物'
                }
            ]
        }
    }
}
</script>
<style lang=""></style>
