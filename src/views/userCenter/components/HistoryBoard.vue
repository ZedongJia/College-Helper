<template>
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
                '2021-5-6': [
                    {
                        time: '8:59',
                        type: '实体查询',
                        content: '玉米'
                    },
                    {
                        time: '8:59',
                        type: '实体识别',
                        content: '袁隆平是xxx得到的'
                    },
                    {
                        time: '8:59',
                        type: '关系查询',
                        content: '玉米属于植物'
                    }
                ],
                '2021-5-5': [
                    {
                        time: '8:59',
                        type: '实体查询',
                        content: '玉米'
                    },
                    {
                        time: '8:59',
                        type: '实体识别',
                        content: '袁隆平是xxx得到的'
                    },
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
