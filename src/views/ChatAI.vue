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
                    v-for="(item, index) in chatItem"
                    :key="item.id"
                >
                    <div
                        class="areachat"
                        :style="{
                            flexDirection: item.isAI ? '' : 'row-reverse'
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
                                padding: item.isAI
                                    ? '0px 0px 0px 15px'
                                    : '0px 15px 0px 0px'
                            }"
                        >
                            <!-- 时间 -->
                            <p
                                class="time"
                                :style="{ textAlign: item.isAI ? '' : 'right' }"
                            >
                                {{ item.time }}
                            </p>
                            <!-- 消息 -->
                            <div
                                :class="{
                                    chatleft: item.isAI,
                                    chatright: !item.isAI
                                }"
                                :style="{ float: item.isAI ? '' : 'right' }"
                                style="z-index: 2"
                            >
                                <p
                                    v-if="!item.isthinking"
                                    class="fade-in"
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
                                    v-if="item.isAI && !item.isthinking"
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
                            <div v-if="item.isAI && item.isShowGraph">
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
                </template>
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
        </Board>
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
    name: 'ChatAI',
    data() {
        return {
            // 所有信息 ai+用户
            chatItem: [
                // 默认
                {
                    username: 'AI',
                    time: '10:26',
                    content: '快来和我交流你的问题叭~',
                    image: 'test.png',
                    isAI: true,
                    tip: '空空如也~',
                    isLoading: false,
                    isthinking: false
                }
            ],
            // 思考ing
            thinkItem: {
                username: 'AI',
                time: '10:26',
                content: '',
                image: 'test.png',
                isAI: 'true',
                isthinking: true
            },
            // 输入框的内容
            chatContent: '',
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
            // 清除聊天记录
            clearText: '让我们开始新的话题吧~~~',
            appear: false
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
                image: 'test.png',
                content: this.chatContent,
                isAI: false
            }
            this.chatItem.push(temp)
            this.chatContent = ''
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
                this.chatItem.push(this.thinkItem)
                this.buttonText = '闭嘴'
                this.toBottomArea()
            }, 1000)
            // AI的消息
            this.timer = setTimeout(() => {
                const time = '17:34'
                const content =
                    'safari 手机版 7.0+（也可能是更早的版本）存在一个错误，当一个元素为交互式元素（例如：<div>），且没有直接将事件监听器绑定在它们自身（即，适用事件委托）时，将无法触发在该元素上触发 click 事件。查看在线演示。也可以看 Safari 的可点击元素 和可点击元素的定义'
                this.aiResponsing(time, content)
            }, 6000)
        },
        // 在消息数组中添加消息
        addOrStop() {
            if (this.buttonText === '提交') {
                // 禁止提交空内容
                if (this.chatContent.trim() !== '') {
                    this.addUserInfo()
                    this.addAiInfo()
                }
            } else {
                this.stopResponse()
            }
        },
        aiResponsing(time, content) {
            const temp = {
                username: 'AI',
                time: time,
                content: content,
                image: 'test.png',
                isAI: true,
                isShowGraph: false,
                tip: '查看关系图',
                isLoading: false
            }
            this.chatItem.pop()
            this.chatItem.push(temp)
            this.toBottomArea()
            // 恢复输入框 恢复按钮内容
            this.inputStyle.style = 'width: 70%;'
            this.inputStyle.disabled = false
            this.inputStyle.placeholder = 'Enter Text...'
            this.buttonText = '提交'
        },
        // 停止AI回答
        stopResponse() {
            const time = '12:34'
            const content = this.stopText
            this.aiResponsing(time, content)
            this.chatItem[this.chatItem.length - 1].tip = this.nullTipText
            clearTimeout(this.timer)
        },
        // 取消清除聊天记录
        stopClearInfo() {
            this.appear = false
        },
        // 清除聊天记录
        clearInfo() {
            // tofo
            this.chatItem = [
                {
                    username: 'AI',
                    time: '12:34',
                    content: this.clearText,
                    isAI: true,
                    image: 'test.png',
                    tip: this.nullTipText
                }
            ]
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
        performSearch() {}
    },
    created() {
        // 向后端请求，得到data，link
        this.data = [
            { name: '玉米', symbolSize: 30, c: 1 },
            { name: '蔬菜', symbolSize: 30, c: 1 },
            { name: '番茄', symbolSize: 30, c: 1 },
            { name: '大西瓜', symbolSize: 30, c: 1 },
            { name: '水果', symbalSize: 30, c: 1 },
            { name: '南开大学', symbalSize: 30, c: 0 },
            { name: '起名字好难啊', symbalSize: 30, c: 0 },
            { name: '大菠萝', symbalSize: 30, c: 0 }
        ]
        this.link = [
            { source: '蔬菜', label: '属于3', target: '南开大学' },
            { source: '水果', label: '属于2', target: '南开大学' },
            { source: '大西瓜', label: '属于1', target: '水果' },
            { source: '番茄', label: '属于0', target: '蔬菜' },
            { source: '玉米', label: '属于5', target: '蔬菜' },
            { source: '起名字好难啊', label: '属于4', target: '南开大学' },
            { source: '大菠萝', label: '属于6', target: '水果' }
        ]
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
}
</style>
