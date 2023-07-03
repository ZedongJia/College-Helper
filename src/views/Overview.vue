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
        <Board style="grid-column: 2 / 5"> 上级分类：</Board>
        <Board style="grid-column: 2 / 5"> 下级分类：</Board>
    </div>
    <PopFrame v-if="appear">
        <div style="width: 50%; margin: 50px auto">
            <Board> 农业分类树 </Board>
            <Board
                style="
                    max-height: 500px; /* 设置容器的最大高度 */
                    overflow-y: auto; /* 添加垂直滚动条 */
                "
            >
                <Tree
                    :model="treeData"
                ></Tree>
            </Board>
            <Board>
                <button
                    class="searchButton"
                    @click="outFrame"
                    style=""
                >
                    返回
                </button>
            </Board>
        </div>
    </PopFrame>
</template>
<script>
import './style/index.css'
const treeData = {
    name: '农业',
    children: [
        { name: 'hello' },
        { name: 'wat' },
        {
            name: '驯养动物',
            children: [
                {
                    name: '畜牧业',
                    children: [{ name: '家畜' }]
                },
                {
                    name: '种植业',
                    children: [{ name: '树' }]
                }
            ]
        }
    ]
}
export default {
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
</style>
