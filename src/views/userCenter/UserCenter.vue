<template>
    <div class="wrapper fade-in">
        <Board style="background-color: var(--item-bg-color); padding: 0">
            <ul class="flex-row-evenly bar">
                <li
                    v-for="(option, index) in options"
                    :key="option"
                    @click="toBoard(index)"
                    :class="{
                        active: index == pointer
                    }"
                >
                    {{ option }}
                </li>
            </ul>
            <component :is="board[pointer]"></component>
        </Board>
    </div>
</template>
<script>
import HomePage from './components/HomePage.vue'
import InfoBoard from './components/InfoBoard.vue'
import PrivacyBoard from './components/PrivacyBoard.vue'
import HistoryBoard from './components/HistoryBoard.vue'
import CollectBoard from './components/CollectBoard.vue'
import ContactBoard from './components/ContactBoard.vue'

export default {
    data() {
        return {
            options: [
                '个人主页',
                '信息修改',
                '隐私设置',
                '查看历史记录',
                '查看收藏',
                '私信'
            ],
            board: [
                'HomePage',
                'InfoBoard',
                'PrivacyBoard',
                'HistoryBoard',
                'CollectBoard',
                'ContactBoard'
            ],
            pointer: 0
        }
    },
    methods: {
        toBoard(index) {
            this.pointer = index
        }
    },
    components: {
        HomePage,
        InfoBoard,
        PrivacyBoard,
        HistoryBoard,
        CollectBoard,
        ContactBoard
    }
}
</script>
<style>
.bar > * {
    /* 边框样式数据 */
    margin-top: 1em;
    flex: 0 0 16%;
    height: 32px;
    line-height: 32px;
    text-align: center;
    font-weight: bold;
    border-radius: 5px 5px 0 0;
    background-color: var(--item-bg-color);
    color: var(--item-font-color);
    /* button样式 */
    cursor: pointer;
    transition: 0.25s;
}

.active {
    position: relative;
    color: var(--font-color);
    background-color: var(--bg-color);
}

.bar ~ div {
    background-color: var(--bg-color);
}
</style>
