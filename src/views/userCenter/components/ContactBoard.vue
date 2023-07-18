<template lang="">
    <div class="flex-row-center">
        <MessageList style="flex: 0 0 30%;" :messageDict="temperoaryDict"></MessageList>
        <ChatBoard style="flex: 0 0 70%;" :info="userInfo"></ChatBoard>
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
                ]
            },
            userInfo: {
                username: 'zhangsan',
                image: 'test.png'
            }
        }
    },
    components: {
        MessageList
    }
}
</script>
