<template>
    <div class="wrapper fade-in">
        <Board>
            <keep-alive>
                <ChatBoard title="" :info="userInfo" AImode />
            </keep-alive>
        </Board>
    </div>
</template>
<script>
export default {
    data() {
        return {
            userInfo: {
                username: 'zhangsan',
                image: 'http://localhost:8000/gallery/match/?ID=5'
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
