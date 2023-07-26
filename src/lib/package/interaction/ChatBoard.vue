<!-- 输出用户与AI的聊天消息 -->
<template>
    <Board
        class="flex-column-evenly"
        inset
    >
        <Title>{{ title }}</Title>
        <hr />
        <div
            id="toBottom"
            class="chat"
        >
            <div
                v-for="(item, index) in messageList"
                :key="item.id"
            >
                <div
                    class="areachat"
                    :style="{
                        flexDirection: item.isLeft ? '' : 'row-reverse'
                    }"
                >
                    <!-- 左侧：头像 + 用户名 -->
                    <div class="left">
                        <img
                            :src="item.image"
                            style="width: 48px;height: 48px;"
                            alt="头像"
                        />
                        <p class="username">{{ item.username }}</p>
                    </div>
                    <!-- 右侧：时间 + 消息 -->
                    <div
                        class="right"
                        :style="{
                            padding: item.isLeft
                                ? '0px 0px 0px 15px'
                                : '0px 15px 0px 0px'
                        }"
                    >
                        <!-- 时间 -->
                        <p
                            class="time"
                            :style="{ textAlign: item.isLeft ? '' : 'right' }"
                        >
                            {{ item.time }}
                        </p>
                        <!-- 消息 -->
                        <div
                            :class="{
                                chatleft: item.isLeft,
                                chatright: !item.isLeft
                            }"
                            :style="{ float: item.isLeft ? '' : 'right' }"
                            style="z-index: 2"
                        >
                            <p
                                v-if="!item.isthinking"
                                class="fade-in"
                                id="chatText"
                            >
                                {{ item.content }}
                            </p>
                            <!-- 思考ing -->
                            <span
                                v-if="item.isthinking"
                                style="display: flex"
                            >
                                <p>正在努力思考中</p>
                                <span
                                    class="dot"
                                    style="font-size: 24px"
                                    >...</span
                                >
                            </span>
                            <!-- AI提示框 -->
                            <div
                                v-if="AImode && item.isLeft && !item.isthinking"
                                class="tooltiptext"
                            >
                                <a
                                    @click="isShow(item, index)"
                                    class="tiplink flex-row"
                                >
                                    <img src="@/assets/icons/chart.png" />
                                    <p>{{ item.tip }}</p>
                                </a>
                            </div>
                        </div>
                        <!-- 关系图 -->
                        <div v-if="item.isLeft && item.isShowGraph">
                            <br />
                            <RelationGraph
                                :data="data"
                                :link="link"
                                isDraggable
                                isAnimation
                                :isLoading="item.isLoading"
                                style="z-index: 1"
                            >
                            </RelationGraph>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr style="margin: 10px 0px 10px 0px" />
        <div
            class="flex-row-center"
            style="width: 80%"
        >
            <!-- 清理聊天记录 -->
            <div
                @click="appear = true"
                class="clearImg"
            >
                <ion-icon
                    style="transform: scale(2)"
                    name="trash-outline"
                ></ion-icon>
            </div>
            <!-- 输入框 -->
            <input
                class="inputItem"
                style="width: 70%"
                :style="{ cursor: canCommit ? '' : 'not-allowed' }"
                :placeholder="
                    canCommit ? 'Enter Text...' : '点击按钮让AI闭嘴...'
                "
                :disabled="!canCommit"
                v-model="chatContent"
                @keyup.enter="commit"
            />
            <!-- 按钮 -->
            <Button @clickIt="commit">
                <ion-icon
                    style="transform: scale(2)"
                    v-if="canCommit"
                    name="send-outline"
                ></ion-icon>
                <ion-icon
                    style="transform: scale(2)"
                    v-else
                    name="close-circle-outline"
                ></ion-icon>
            </Button>
        </div>
        <PromptBox
            v-if="appear"
            title="确认清空？"
            @confirm="clearInfo"
            @back="stopClearInfo"
        />
    </Board>
</template>

<script>
import { nextTick, ref } from 'vue'
import { loading } from '@/utils/callback'

export default {
    name: 'ChatBoard',
    props: {
        info: Object,
        AImode: Boolean,
        title: String
    },
    computed: {
        typedText() {
            return this.printtext.slice(0, this.currentIndex)
        }
    },
    data() {
        return {
            // 消息模板
            template: {
                left: {
                    // 对方的信息
                    username: this.info.username,
                    image: this.info.image,
                    time: '',
                    content: '',
                    isLeft: true,
                    isLoading: false,
                    isthinking: false,
                    isShowGraph: false,
                    tip: '空空如也'
                },
                right: {
                    // 你的信息
                    username: this.$store.state.userInfo.nickname,
                    image: this.$store.state.userInfo.image,
                    time: '',
                    content: '',
                    isLeft: false
                }
            },
            updateEvent: '',
            messageList: [],
            chatContent: '',
            // 答案的关系数据
            data: [],
            link: [],
            canCommit: true,
            // 定时器
            timer: ref(null),
            // 闭嘴
            stopText: '好的，我闭嘴啦',
            appear: false,
            // 打字效果
            printtext: '',
            currentIndex: 0
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
        // 获取当前时间
        getCurrentTime() {
            const time = '10:26'
            return time
        },
        // 生成消息
        generateMessage(content, time, pos) {
            const temp = Object.create(this.template[pos])
            temp.content = content
            temp.time = time
            return temp
        },
        AIresponse() {
            // 禁用输入框 修改按钮内容
            this.canCommit = false
            // 思考
            setTimeout(() => {
                const temp = this.generateMessage(
                    '',
                    this.getCurrentTime(),
                    'left'
                )
                temp.isthinking = true
                this.messageList.push(temp)
                this.toBottomArea()
            }, 100)
            // 获取答案
            this.timer = setTimeout(() => {
                // 请求数据
                const content = '这是答案'
                // 弹出thinking数据
                this.messageList.pop()
                // 生成content 修改相应内容
                const temp = this.generateMessage(
                    content,
                    this.getCurrentTime(),
                    'left'
                )
                temp.tip = '查看关系图'
                this.messageList.push(temp)
                this.toBottomArea()
                // 恢复输入框 恢复按钮内容
                this.canCommit = true
            }, 6000)
        },
        // 提交用户输入的文本
        commit() {
            if (this.canCommit) {
                // 禁止提交空内容
                if (this.chatContent.trim() !== '') {
                    this.messageList.push(
                        this.generateMessage(
                            this.chatContent,
                            this.getCurrentTime(),
                            'right'
                        )
                    )
                    this.toBottomArea()
                    // 搜索框置空
                    this.chatContent = ''
                    // 向后端请求数据，看是否有对方的信息
                    setTimeout(() => {
                        this.messageList.push(
                            this.generateMessage(
                                '哈喽哈喽',
                                this.getCurrentTime(),
                                'left'
                            )
                        )
                        this.toBottomArea()
                    }, 3000)
                    if (this.AImode) {
                        this.AIresponse()
                    }
                }
            } else {
                this.stopResponse()
            }
        },
        // 停止AI回答
        stopResponse() {
            // 弹出思考ing
            this.messageList.pop()
            // 停止回答
            this.messageList.push(
                this.generateMessage(
                    this.stopText,
                    this.getCurrentTime(),
                    'left'
                )
            )
            // 清除延时器  后期应该是拦截请求
            clearTimeout(this.timer)
            this.canCommit = true
        },
        // 清除聊天记录
        clearInfo() {
            // 清空数组
            this.messageList = []
            if (this.AImode) {
                this.messageList.push(
                    this.generateMessage(
                        '让我们开始新的话题叭~',
                        this.getCurrentTime(),
                        'left'
                    )
                )
            }
            // 清除延时器  后期应该是拦截请求
            clearTimeout(this.timer)
            this.canCommit = true
            // 关闭弹窗
            this.appear = false
        },
        // 停止清除聊天记录
        stopClearInfo() {
            this.appear = false
        },
        // 显示关系图
        isShow(item, index) {
            if (
                index !== 0 &&
                this.messageList[index].content !== this.stopText
            ) {
                if (!item.isShowGraph) {
                    item.tip = '收起关系图'
                } else {
                    item.tip = '查看关系图'
                }
                item.isShowGraph = !item.isShowGraph

                // 加载关系图
                // todo
                item.isLoading = true
                if (index === this.messageList.length - 1) {
                    this.toBottomArea()
                }

                // waiting for data
                loading(() => {
                    item.isLoading = false
                    this.data = []
                    this.link = []
                    if (index === this.messageList.length - 1) {
                        this.toBottomArea()
                    }
                })
            }
        }
        // // 打字效果
        // printText(text) {
        //     // const textContainer = document.getElementById('chatText')
        //     this.printtext = text
        //     const interval = setInterval(() => {
        //         if (this.currentIndex <= this.printtext.length) {
        //             this.currentIndex++
        //         } else {
        //             clearInterval(interval)
        //         }
        //     }, 25)
        // }
    },
    mounted() {
        setTimeout(() => {
            const div = document.getElementById('toBottom')
            if (div !== undefined) {
                div.scrollTop = div.scrollHeight
            }
        }, 0)
    },
    created() {
        // 设定更新时间，用于获取left用户信息, 500ms请求一次
        if (!this.AImode) {
            // 获取先前聊天记录
            const HistoryMesList = [
                { ID: 1, time: '10:23', content: '哈喽哈喽' },
                { ID: 1, time: '10:24', content: '额鹅鹅鹅' },
                { ID: 1, time: '10:26', content: '不理我' },
                { ID: 2, time: '10:30', content: '你好你好' },
                { ID: 2, time: '10:30', content: '刚才在打游戏' },
                { ID: 1, time: '10:31', content: '噢噢没事' }
            ]
            // 将历史纪录加入到消息列表中
            for (let i = 0; i < HistoryMesList.length; i++) {
                if (HistoryMesList[i].ID === 1) {
                    this.messageList.push(
                        this.generateMessage(
                            HistoryMesList[i].content,
                            HistoryMesList[i].time,
                            'right'
                        )
                    )
                } else {
                    this.messageList.push(
                        this.generateMessage(
                            HistoryMesList[i].content,
                            HistoryMesList[i].time,
                            'left'
                        )
                    )
                }
            }
            this.updateEvent = setInterval(() => {
                // 请求contentList，后端会保留left最后一次请求截止日期
                // 500ms更新一次聊天记录，并保存到数组中
                const newInfo = []
                for (let i = 0; i < newInfo.length; i++) {
                    if (newInfo[i].ID === 1) {
                        this.messageList.push(
                            this.generateMessage(
                                newInfo[i].content,
                                newInfo[i].time,
                                'right'
                            )
                        )
                    } else {
                        this.messageList.push(
                            this.generateMessage(
                                newInfo[i].content,
                                newInfo[i].time,
                                'left'
                            )
                        )
                    }
                }
            }, 500)
        } else {
            this.messageList.push(
                this.generateMessage(
                    '快来和我交流你的问题叭~',
                    this.getCurrentTime(),
                    'left'
                )
            )
        }
    },
    unmounted() {
        clearInterval(this.updateEvent)
    }
}
</script>

<style>
/* scrollbar */
.chat::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    background-color: var(--bg-color);
}

.chat::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: var(--item-bg-color);
}

.chat::-webkit-scrollbar-button {
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: var(--item-bg-color);
}

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
