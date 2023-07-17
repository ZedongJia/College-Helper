<!-- 输出用户与AI的聊天消息 -->
<template>
    <h2 style="text-align: center; margin: 10px 0 10px 0">加点什么呢</h2>
    <hr />
    <div
        id="toBottom"
        class="chat"
    >
        <div
            v-for="(item, index) in chatItem"
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
                        :src="require('../assets/' + item.image)"
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
                            v-if="
                                talkingWithAI && item.isLeft && !item.isthinking
                            "
                            class="tooltiptext"
                        >
                            <a
                                @click="isShow(item, index)"
                                class="tiplink flex-row"
                            >
                                <img src="../assets/icons/chart.png" />
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
    <div class="flex-row">
        <!-- 清理聊天记录 -->
        <img
            src="../assets/icons/clear.png"
            @click="appear = true"
            class="clearImg"
        />
        <!-- 输入框 -->
        <input
            v-bind="inputStyle"
            v-model="chatContent"
            @keyup.enter="addOrStop"
        />
        <!-- 按钮 -->
        <Button
            @clickIt="addOrStop"
            style="width: 15%; margin-left: 10px"
        >
            {{ buttonText }}
        </Button>
    </div>
    <PopFrame v-if="appear">
        <div style="width: 40%; margin: 180px 0px 0px 40%">
            <Board style="border-radius: 20px; text-align: center">
                <h3>清空聊天记录</h3>
                <hr style="margin: 3% 0 3% 0" />
                <p>确定清空当前对话内容吗？此操作将无法恢复！</p>
                <hr style="margin: 3% 0 3% 0" />
                <div style="align-items: center">
                    <Button
                        @clickIt="stopClearInfo"
                        style="margin-right: 10px"
                    >
                        取消
                    </Button>
                    <Button @clickIt="clearInfo"> 确定 </Button>
                </div>
            </Board>
        </div>
    </PopFrame>
</template>
<script>
import { nextTick, ref } from 'vue'
import { loading } from '@/utils/callback'
export default {
    name: 'ChatBoard',
    props: {
        info: Object,
        AImode: Boolean
    },
    data() {
        return {
            // 消息模板
            template: {
                left: {
                    // 你的信息
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
                    username: '',
                    image: '',
                    time: '',
                    content: '',
                    isLeft: true,
                    isLoading: false,
                    isthinking: false,
                    isShowGraph: false,
                    tip: '空空如也'
                }
            },
            updateEvent: '',
            messageList: [],
            chatContent: '',
            canCommit: true,
            // 提交按钮
            buttonText: '提交',
            // 答案的关系数据
            data: [],
            link: [],
            // 输入框样式
            inputStyle: {
                class: 'inputItem',
                style: 'width: 70%;',
                placeholder: 'Enter Text...',
                disabled: false
            },
            // 定时器
            timer: ref(null),
            // 闭嘴
            stopText: '好的，我闭嘴啦',
            nullTipText: '空空如也~',
            appear: false
        }
    },
    methods: {
        // 发出消息后，当超出最大高度时，聊天框移到最底部显示刚发出的消息
        toBottomArea() {
            nextTick(() => {
                const div = document.getElementById('toBottom')
                div.scrollTop = div.scrollHeight
                this.height = div.scrollTop
            })
        },
        // 获取当前时间
        getCurrentTime() {
            const time = '10:26'
            return time
        },
        // 默认设置  清空chatItem并添加初始项
        defaultSet(content) {
            // 添加default消息
            const defaultItem = Object.create(this.templateInfo)
            // 修改相关信息
            defaultItem.time = this.getCurrentTime()
            defaultItem.content = content
            // 清空chatItem并添加defaultItem
            this.chatItem.push(defaultItem)
            this.appear = false
        },
        // 在聊天框加载用户的消息
        addUserInfo(username, time, image, content, isLeft) {
            // 获取消息模板

            /**
             * ERROR: 这里传的是引用，需要深层拷贝
             */
            const infoUser = Object.create(this.templateInfo)
            // 修改相关信息
            infoUser.username = username
            infoUser.time = time
            infoUser.content = content
            infoUser.image = image
            infoUser.isLeft = isLeft
            // 添加
            this.chatItem.push(infoUser)
            // 如果不是左边，则清空搜索框
            if (infoUser.isLeft === false) {
                this.chatContent = ''
            }
            this.toBottomArea()
        },
        // 在聊天框加载AI的消息
        addAiInfo() {
            // 禁用输入框 修改按钮内容
            this.inputStyle.style = 'width: 70%; cursor: not-allowed'
            this.inputStyle.placeholder = '点击按钮让AI闭嘴~'
            this.inputStyle.disabled = true
            // 假装思考，加载 loading...
            setTimeout(() => {
                // 思考ing
                const thinkItem = Object.create(this.templateInfo)
                // 思考的相关设置
                thinkItem.time = this.getCurrentTime()
                thinkItem.content = ''
                thinkItem.isthinking = true
                // 添加
                this.chatItem.push(thinkItem)
                this.buttonText = '闭嘴'
                this.toBottomArea()
            }, 100)
            // AI的消息
            // 向后端发送请求，获取content   content='后端答案'  在获取答案之前一直处于思考阶段  这里使用setTimeOut暂时代替
            this.timer = setTimeout(() => {
                const time = this.getCurrentTime()
                const content =
                    'safari 手机版 7.0+（也可能是更早的版本）存在一个错误，当一个元素为交互式元素（例如：<div>），且没有直接将事件监听器绑定在它们自身（即，适用事件委托）时，将无法触发在该元素上触发 click 事件。查看在线演示。也可以看 Safari 的可点击元素 和可点击元素的定义'
                this.aiResponsing(time, content)
            }, 6000)
        },
        aiResponsing(time, content) {
            const infoAI = Object.create(this.templateInfo)
            infoAI.time = time
            infoAI.content = content
            infoAI.tip = '查看看关系图'
            console.log(this.chatItem)
            // 将 thinkItem 从列表中删去
            this.chatItem.pop()
            // 添加AI回答
            this.chatItem.push(infoAI)
            this.toBottomArea()
            // 恢复输入框 恢复按钮内容
            this.inputStyle.style = 'width: 70%;'
            this.inputStyle.disabled = false
            this.inputStyle.placeholder = 'Enter Text...'
            this.buttonText = '提交'
        },
        // 在消息数组中添加消息
        addOrStop() {
            if (this.buttonText === '提交') {
                // 禁止提交空内容
                if (this.chatContent.trim() !== '') {
                    // 获取用户的当前时间、用户名、头像
                    this.addUserInfo(
                        this.user1.username,
                        this.getCurrentTime(),
                        this.user1.image,
                        this.chatContent,
                        false
                    )
                    if (this.talkingWithAI === true) {
                        // 获取AI回答
                        this.addAiInfo()
                    } else {
                        // 获取对方用户的回答   使用setTimeOut暂时代替
                        setTimeout(() => {
                            // 获取回答
                            const content = '好吧'
                            this.addUserInfo(
                                this.user2.username,
                                this.getCurrentTime(),
                                this.user2.image,
                                content,
                                true
                            )
                        }, 3000)
                    }
                }
            } else {
                this.stopResponse()
            }
        },
        // 停止AI回答
        stopResponse() {
            // 获取当前时间
            const time = this.getCurrentTime()
            const content = this.stopText
            // 停止回答后显示的文本
            this.aiResponsing(time, content)
            this.chatItem[this.chatItem.length - 1].tip = this.nullTipText
            // 清除延时器  后期应该是拦截请求
            clearTimeout(this.timer)
        },
        // 清除聊天记录
        clearInfo() {
            this.defaultSet('让我们开始新的话题叭~')
        },
        // 停止清除聊天记录
        stopClearInfo() {
            this.appear = false
        },
        // 显示关系图
        isShow(item, index) {
            console.log(this.chatItem[index].content)
            if (index !== 0 && this.chatItem[index].content !== this.stopText) {
                if (!item.isShowGraph) {
                    item.tip = '收起关系图'
                } else {
                    item.tip = '查看关系图'
                }
                item.isShowGraph = !item.isShowGraph

                // 加载关系图
                // todo
                item.isLoading = true
                if (index === this.chatItem.length - 1) {
                    this.toBottomArea()
                }

                // waiting for data
                loading(() => {
                    item.isLoading = false
                    this.data = []
                    this.link = []
                    if (index === this.chatItem.length - 1) {
                        this.toBottomArea()
                    }
                })
            }
        },
        printText() {
            // const textContainer = document.getElementById('chatText')
            let index = 0
            const interval = setInterval(() => {
                if (index <= this.showText.length) {
                    this.text = this.showText.slice(0, index)
                    index++
                } else {
                    clearInterval(interval)
                }
            }, 25)
        }
    },
    computed: {},
    created() {
        // 是否添加默认信息
        if (this.talkingWithAI === true) {
            this.defaultSet('快来和我交流你的问题叭~')
        }
        // 处理props
        for (const k in Object.keys(this.info)) {
            const info = this.info[k]
            for (const _k in Object.keys(this.info[k])) {
                this.template[k][_k] = info[_k]
            }
        }
        // 获取先前聊天记录
        // this.messageList = messageList

        // 设定更新时间，用于获取left用户信息, 500ms请求一次
        if (!this.Aimode) {
            this.updateEvent = setInterval(() => {
                // // 请求contentList，后端会保留left最后一次请求截止日期
                // for (const c in contentList) {
                //     generateMessage(c, 'left')
                // }
            }, 500)
        }
    }
}
</script>
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
    text-decoration: underline dashed red;
}
</style>
