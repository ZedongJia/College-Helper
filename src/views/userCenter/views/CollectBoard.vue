<template>
    <EmptyHint v-if="isEmpty"></EmptyHint>
    <MessageList
        v-else
        style="width: 100%"
        :messageDict="collectionDict"
        :headers="['时间', '查询分类', '内容']"
        :colWidth="[30, 20, 50]"
        @query="turnTo"
        @del="del"
    ></MessageList>
</template>
<script>
import { getCollectionInfo, deleteCollectionInfo } from '@/api/user'

export default {
    data() {
        return {
            collectionDict: {}
        }
    },
    computed: {
        isEmpty() {
            return JSON.stringify(this.collectionDict) === '{}'
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
            const { time, type, content } = this.collectionDict[group][index]
            deleteCollectionInfo({
                time: time,
                type: type,
                content: content
            })
                .then(() => {
                    this.$store.commit('prompt/trigger', '删除成功')
                    this.loadData()
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        },
        loadData() {
            // require
            getCollectionInfo()
                .then((collectionInfo) => {
                    this.collectionDict = collectionInfo
                })
                .catch((error) => {
                    this.$store.commit('prompt/trigger', {
                        msg: error,
                        level: 'warning'
                    })
                })
        }
    },
    created() {
        this.loadData()
    }
}
</script>
