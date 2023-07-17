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
<<<<<<< HEAD
=======
<style>
/* 聊天区域 */
.chat {
    width: 100%;
    height: 450px;
    padding: 1%;
    overflow-x: hidden;
    overflow-y: auto;
}
/* 左尖角聊天框  右尖角聊天框 */
.chatleft,
.chatright {
    width: fit-content;
    padding: 10px;
    border: 1px solid #19d412;
    border-radius: 5px;
    background-color: #19d412;
    position: relative;
    filter: drop-shadow(0.2em 0.2em 0.2rem rgba(20, 20, 0, 20));
}
.chatleft:before,
.chatright:before {
    top: 12%;
    border-top: 5px solid transparent;
    border-bottom: 8px solid transparent;
    position: absolute;
    content: '';
}
.chatleft:before {
    left: -10px;
    border-right: 10px solid #19d412;
}
.chatright:before {
    right: -10px;
    border-left: 10px solid #19d412;
}
/* 一条消息行 */
.areachat {
    width: 100%;
    margin: 10px 10px 20px 10px;
    display: flex;
}
/* 消息行的左侧：圆形图像 + 用户名 */
.areachat .left {
    width: 10%;
    text-align: center;
}
.areachat .left img {
    width: 100%;
    border-radius: 50%;
    overflow: hidden;
}
.areachat .left .username {
    font-size: 14px;
}
/* 消息行的右侧：时间 */
.areachat .right {
    width: 80%;
}
.areachat .right .time {
    margin-top: 5px 0px 1px 0px;
    font-size: 14px;
    color: gray;
}
/* 清除聊天记录 */
.clearImg {
    margin-right: 10px;
    cursor: pointer;
    opacity: 0.7;
    transition: 0.25s;
}
.clearImg:hover {
    opacity: 1;
}

/* 提示框 */
.tooltiptext,
.tooltiptext {
    width: fit-content;
    min-width: 135px;
    padding: 10px;
    border-radius: 6px;
    margin-left: -60px;
    left: 50%;
    top: 95%;
    background-color: gray;
    text-align: center;
    position: absolute;
    z-index: 9999;
    opacity: 0;
    transition: 1s;
    visibility: hidden;
}
.tooltiptext::after,
.tooltiptext::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent gray transparent;
}
.chatleft:hover .tooltiptext,
.chatright:hover .tooltiptext {
    visibility: visible;
    opacity: 0.75;
}
.chatleft:hover .tooltiptext:hover,
.chatright:hover .tooltiptext:hover {
    opacity: 1;
    transition: 0.5s;
}
/* 提示框中的链接 */
.tiplink {
    font-size: 14px;
    color: var(--item-font-color);
    transition: 0.5s;
}
.tiplink:hover {
    cursor: pointer;
    transition: 0.5s;
    font-size: 16px;
}
</style>
>>>>>>> 4b887b932a3cec487d6d4d515f6f618017625e5f
