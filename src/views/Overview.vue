<template>
    <div class="wrapper overviewlayout">
        <Board style="grid-column: 1 / 2">
            分类专题：[{{ category }}] <br />
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
        <Board> 农业分类树 </Board>
        <Board style="height: 75%">
            <Tree
                class="item"
                :model="treeData"
            ></Tree>
        </Board>
        <button
            class="searchButton"
            @click="outFrame"
            style="position: absolute; top: 87%; right: 0"
        >
            返回
        </button>
    </PopFrame>
</template>
<script>
import './style/index.css'
import Tree from './Tree.vue'
const treeData = {
    name: 'My Tree',
    children: [
        { name: 'hello' },
        { name: 'wat' },
        {
            name: 'child folder',
            children: [
                {
                    name: 'child folder',
                    children: [{ name: 'hello' }, { name: 'wat' }]
                },
                { name: 'hello' },
                { name: 'wat' },
                {
                    name: 'child folder',
                    children: [{ name: 'hello' }, { name: 'wat' }]
                }
            ]
        }
    ]
}

export default {
    components: {
        Tree
    },
    data() {
        return {
            appear: false,
            treeData
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
.item {
  cursor: pointer;
  line-height: 1.5;
}
.bold {
  font-weight: bold;
}
</style>
