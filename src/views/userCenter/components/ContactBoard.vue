<template lang="">
    <MessageList :messageDict="templateDict"></MessageList>
    <ChatBoard :info="userInfo"></ChatBoard>
</template>
<script>
export default {
    data() {
        return {
            templateDict: {
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
    }
}
</script>
<style lang=""></style>
