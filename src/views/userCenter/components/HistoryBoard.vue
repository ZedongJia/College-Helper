<template>
    <MessageList
        :messageDict="historyDict"
        :headers="['时间','查询分类','内容']"
        :colWidth="[20, 10, 70]"
        @query="turnTo"
        @del="del"
    ></MessageList>
</template>
<script>
import MessageList from './MessageList.vue'
export default {
    data() {
        return {
            historyDict: {}
        }
    },
    methods: {
        turnTo(group, index) {
            const { type, content } = this.historyDict[group][index]
            let page = ''
            switch (type) {
                case '实体识别':
                    page = 'identification'
                    break
                case '关系查询':
                    page = 'relationSearch'
                    break
                case '实体查询':
                    page = 'entitySearch'
                    break
            }
            this.$router.push({
                path: page,
                meta: {
                    content: content
                }
            })
        },
        del(group, index) {
            // todo
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
