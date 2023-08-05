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
                username: '小农',
                image: 'http://localhost:8000/gallery/match?ID=5'
            }
        }
    }
}
</script>
