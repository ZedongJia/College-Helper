<template lang="">
    <div class="wrapper fade-in">
        <Board style="backgroud-color: var(--item-bg-color);" class="flex-row-evenly">
            <span v-for="option in options" :key="option">
                {{ option }}
            </span>
        </Board>
        <Board>
            <component :is='board[pointer]'></component>
        </Board>
    </div>
</template>
<script>
import InfoBoard from './components/InfoBoard.vue'
import PrivacyBoard from './components/PrivacyBoard.vue'
import HistoryBoard from './components/HistoryBoard.vue'
import CollectBoard from './components/CollectBoard.vue'
import ContactBoard from './components/ContactBoard.vue'

export default {
    data() {
        return {
            options: [
                '信息修改',
                '隐私设置',
                '查看历史记录',
                '查看收藏',
                '私信'
            ],
            board: [
                InfoBoard,
                PrivacyBoard,
                HistoryBoard,
                CollectBoard,
                ContactBoard
            ],
            pointer: 0
        }
    },
    components: {
        InfoBoard,
        PrivacyBoard,
        HistoryBoard,
        CollectBoard,
        ContactBoard
    }
}
</script>
<style></style>
