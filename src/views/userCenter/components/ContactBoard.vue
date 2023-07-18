<template lang="">
    <div class="flex-row-center">
        <MessageList
            style="flex: 0 0 30%"
            :messageDict="temperoaryDict"
            :headers="['时间', '昵称']"
            :colWidth="[30, 70]"
            @query="talkTo"
            @del="del"
        ></MessageList>
        <div style="flex: 0 0 70%">
            <EmptyHint v-if="JSON.stringify(personInfo) === '{}'"></EmptyHint>
            <ChatBoard v-else :info="personInfo"></ChatBoard>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            temperoaryDict: {
                临时会话: [
                    {
                        time: '8:59',
                        nickname: 'zhangsan'
                    },
                    {
                        time: '8:59',
                        nickname: 'lisi'
                    }
                ]
            },
            personInfo: {}
        }
    },
    methods: {
        talkTo(group, index) {
            // 请求人员数据
            const image = 'http://localhost:8000/gallery/match/?ID=5'
            const talkToPerson = this.temperoaryDict[group][index]
            this.personInfo.username = talkToPerson.nickname
            this.personInfo.image = image
        },
        del(group, indx) {
            // todo
        }
    }
}
</script>
