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
        <div
            class="cus_vtree_wrap"
            @click.capture="clickNodeWrap"
        >
            <v-tree-item
                :treeData="treeData"
                @clickNodeCom="clickNode"
                :checkBox="checkBox"
                :class="{ tree_root_lonely: treeData.length === 1 }"
                @toggleCheckBox="checkBoxFun"
            ></v-tree-item>
        </div>

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
    name: 'vue-tree',
    props: ['treeData', 'checkBox'],
    data() {
        return {
            appear: false
        }
    },
    mounted() {
        this.initData(true, true, true)
    },
    updated() {
        this.initData(true, true, true)
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
