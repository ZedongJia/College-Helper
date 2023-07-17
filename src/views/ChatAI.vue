<template>
    <div class="wrapper fade-in">
        <Board>
            <ChatBoard
                :info="userInfo"
            />
        </Board>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userInfo: {
                username: 'AI',
                image: 'test.png'
            }
        }
    },
    created() {
        // 向后端获取user1、user2信息
        this.user1 = {
            username: '雨霖铃',
            image: 'test.png',
            isLleft: true
        }
        this.user2 = {
            username: '雨霖铃',
            image: 'test.png',
            isLeft: false
        }
    }
}
</script>
