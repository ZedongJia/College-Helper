<template>
    <div class="overviewlayout">
        <Board style="grid-column: 1 / 2">
            分类专题：[{{ category }}] <br />
            <ui>
                <li></li>
                <li></li>
            </ui>
        </Board>
        <Board style="grid-column: 2 / 5">
            分类导航:
            <button
                class="searchButton flex-column"
                @click="outFrame"
                style="margin: 20px 0; width: 100%"
            >
                显示
            </button>
        </Board>
        <Board style="grid-column: 2 / 5"></Board>
        <Board style="grid-column: 2 / 5"></Board>
    </div>
    <PopFrame v-if="appear">
        <button
            class="searchButton"
            @click="outFrame"
            style="position: absolute; top: 87%; right: 1%"
        >
            返回
        </button>
    </PopFrame>
</template>
<script>
import './style/index.css'
export default {
    data() {
        return {
            appear: false
        }
    },
    methods: {
        outFrame() {
            this.appear = !this.appear
        }
    }
}
</script>
<style>
.overviewlayout {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-gap: 15px 13px;
}
</style>
