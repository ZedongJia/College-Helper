<template>
    <EmptyHint v-if="isEmpty"></EmptyHint>
    <MessageList
        v-else
        style="width: 100%"
        :messageDict="historyDict"
        :headers="['时间', '查询分类', '内容']"
        :colWidth="[15, 20, 65]"
        @query="turnTo"
        @del="del"
    ></MessageList>
</template>
<script>
import { getBrowseInfo, deleteBrowseInfo } from '@/api/user'
export default {
    data() {
        return {
            historyDict: {}
        }
    },
    computed: {
        isEmpty() {
            return JSON.stringify(this.historyDict) === '{}'
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
            const { time, type, content } = this.historyDict[group][index]
            deleteBrowseInfo({
                ID: this.$store.state.userInfo.ID,
                time: group + time,
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
            getBrowseInfo({
                ID: this.$store.state.userInfo.ID
            })
                .then((browseInfo) => {
                    this.historyDict = browseInfo
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
