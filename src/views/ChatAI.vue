<template>
    <div class="wrapper fade-in">
        <Board>
            <h2 style="text-align: center; margin: 10px 0 10px 0">
                加点什么呢
            </h2>
            <hr />
            <div
                id="toBottom"
                class="chat"
            >
                <!-- 输出用户与AI的聊天消息 -->
                <template
                    v-for="item in chatItem"
                    :key="item.id"
                >
                    <!-- AI消息 -->
                    <div
                        v-if="item.isAI"
                        class="areachat"
                    >
                        <!-- 左侧：头像+用户名 -->
                        <div class="left">
                            <img
                                src="../assets/test.png"
                                alt="头像"
                            />
                            <p class="username">{{ item.username }}</p>
                        </div>
                        <!-- 右侧：消息框 -->
                        <div
                            class="right"
                            style="padding-left: 15px"
                        >
                            <p class="time">{{ item.time }}</p>
                            <div class="chatleft">
                                <p class="fade-in">{{ item.content }}</p>
                            </div>
                        </div>
                    </div>
                    <!-- 用户消息 -->
                    <div
                        v-else
                        class="areachat"
                        style="flex-direction: row-reverse"
                    >
                        <!-- 右侧(使用left)：头像+用户名 -->
                        <div
                            class="left"
                            style="margin-right: 2%"
                        >
                            <img
                                src="../assets/test.png"
                                alt="头像"
                            />
                            <p class="username">{{ item.username }}</p>
                        </div>
                        <!-- 左侧(使用right) -->
                        <div
                            class="right"
                            style="padding-right: 15px"
                        >
                            <p
                                class="time"
                                style="text-align: right"
                            >
                                {{ item.time }}
                            </p>
                            <div
                                class="chatright"
                                style="float: right"
                            >
                                <p class="fade-in">
                                    {{ item.content }}
                                </p>
                            </div>
                        </div>
                    </div>
                </template>
                <!-- 思考 -->
                <div
                    v-if="thinking"
                    class="areachat"
                >
                    <div class="left">
                        <img
                            src="../assets/test.png"
                            alt="头像"
                        />
                        <p class="username">AI</p>
                    </div>
                    <div
                        class="right"
                        style="padding-left: 15px"
                    >
                        <p class="time">14:34</p>
                        <div class="chatleft fade-in">
                            <span style="display: flex">
                                正在努力思考中
                                <span
                                    class="dot"
                                    style="font-weight: bold"
                                    >...</span
                                >
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <hr
                class="line"
                style="margin: 10px 0px 10px 0px"
            />
            <div class="flex-row">
                <!-- 清理聊天记录 -->
                <img
                    src="../assets/icons/clear.png"
                    @click="clearInfo"
                    class="clearImg"
                />
                <!-- 输入框 -->
                <input
                    class="inputItem"
                    style="width: 70%"
                    v-model="chatContent"
                    placeholder="Enter Text..."
                />
                <!-- 按钮 -->
                <Button
                    @clickIt="addAllInfo"
                    style="width: 15%; margin-left: 10px"
                >
                    提交
                </Button>
            </div>
        </Board>
    </div>
</template>

<script>
import { nextTick } from 'vue'
export default {
    name: 'ChatAI',
    data() {
        return {
            chatItem: [
                // 默认
                {
                    username: 'AI',
                    time: '10:26',
                    content: '快来和我交流你的问题叭~~~',
                    url: '../assets/test.png',
                    isAI: true
                }
            ],
            chatContent: '',
            isAI: false,
            thinking: false
        }
    },
    methods: {
        // 发出消息后，当超出最大高度时，聊天框移到最底部显示刚发出的消息
        toBottomArea() {
            nextTick(() => {
                const div = document.getElementById('toBottom')
                div.scrollTop = div.scrollHeight
            })
        },
        // 在聊天框加载用户的消息
        addUserInfo() {
            const temp = {
                username: '雨霖铃',
                time: '12:34',
                content: this.chatContent,
                isAI: false
            }
            this.chatItem.push(temp)
            this.chatContent = ''
            this.isAI = !this.isAI
            this.toBottomArea()
        },
        // 在聊天框加载AI的消息
        addAiInfo() {
            // 假装思考，加载 loading...
            setTimeout(() => {
                this.thinking = true
                this.toBottomArea()
            }, 1000)
            // AI的消息
            setTimeout(() => {
                this.thinking = false
                const temp = {
                    username: 'AI',
                    time: '12:34',
                    content: '件新专辑次哦安吉莉卡这两款查完豆坚持住哦啊',
                    isAI: true
                }
                this.chatItem.push(temp)
                this.toBottomArea()
            }, 6000)
        },
        addAllInfo() {
            console.log(this.chatContent.trim())
            if (this.chatContent.trim() !== '') {
                this.addUserInfo()
                this.addAiInfo()
            }
        },
        // 清除聊天记录
        clearInfo() {
            // tofo
            this.chatItem = [
                {
                    username: 'AI',
                    time: '12:34',
                    content: '让我们开始新的话题吧~~~',
                    isAI: true
                }
            ]
            this.isAI = false
        }
    }
}
</script>
<style>
/* 聊天区域 */
.chat {
    width: 100%;
    height: 400px;
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
</style>
