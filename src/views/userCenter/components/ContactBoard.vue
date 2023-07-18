<template lang="">
    <div class="flex-row-center">
        <MessageList
            style="flex: 0 0 30%"
            :messageDict="temperoaryDict"
            :headers="['时间','昵称']"
            :colWidth="[30, 70]"
            @query="talkTo"
            @del="del"
        ></MessageList>
        <EmptyHint v-if="talkToPerson === ''"></EmptyHint>
        <div v-else>{{ talkToPerson }}</div>
        <!-- <ChatBoard style="flex: 0 0 70%;" :info="userInfo"></ChatBoard> -->
    </div>
</template>
<script>
import MessageList from './MessageList.vue'
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
            userInfo: {
                username: 'zhangsan',
                image: 'test.png'
            },
            talkToPerson: ''
        }
    },
    methods: {
        talkTo(group, index) {
            this.talkToPerson = this.temperoaryDict[group][index]
        },
        del(group, indx) {
            // todo
        }
    },
    components: {
        MessageList
    }
}
</script>
