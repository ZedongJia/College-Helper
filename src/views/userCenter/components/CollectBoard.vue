<template lang="">
    <MessageList
        style="width: 70%;"
        :messageDict="collectionDict"
        :headers="['时间','查询分类','内容']"
        :colWidth="[20, 10, 70]"
        @query="turnTo"
        @del="del"
    ></MessageList>
</template>
<script>
import { getCollectedInfo } from '@/api/user'

export default {
    data() {
        return {
            collectionDict: {
                实体查询: [
                ],
                关系查询: [
                ],
                实体识别: [
                ]
            }
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
    created() {
        // require
        getCollectedInfo({
                user_ID: this.$store.state.userInfo.ID
            })
                .then((response) => {
                    if (JSON.stringify(response.data) !== '{}') {
                        const temp = response.data
                        for (let i = 0; i < temp.length; i++) {
                            this.collectionDict[temp[i].type].push(temp[i])
                        }
                    } else {
                        console.log('失败')
                    }
                })
                .catch(() => {
                    console.log('网络故障，请重试')
                })
    }
}
</script>
