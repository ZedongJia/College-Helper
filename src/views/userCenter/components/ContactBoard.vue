<template lang="">
    <div
        class="flex-row-evenly"
        style="width: 88%; height: 600px"
    >
        <MessageList
            style="flex: 0 0 30%; height: 100%"
            :messageDict="temperoaryDict"
            :headers="['时间', '昵称']"
            :colWidth="[30, 70]"
            @query="talkTo"
            @del="del"
        ></MessageList>
        <div
            style="flex: 0 0 2%; height: 100%; border-right: 1px solid grey"
        ></div>
        <div style="flex: 0 0 68%; height: 100%">
            <EmptyHint v-if="JSON.stringify(personInfo) === '{}'"></EmptyHint>
            <keep-alive :max="10" v-else>
                <ChatBoard
                    :title="personInfo.username"
                    :info="personInfo"
                    :key="personInfo.username"
                ></ChatBoard>
            </keep-alive>
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
<style>
.t {
    align-items: baseline;
}
</style>
