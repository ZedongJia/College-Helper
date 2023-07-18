<template lang="">
    <MessageList
        :messageDict="collectionDict"
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
            collectionDict: {}
        }
    },
    methods: {
        turnTo(group, index) {
            const { type, content } = this.collectionDict[group][index]
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
        this.collectionDict = {
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
