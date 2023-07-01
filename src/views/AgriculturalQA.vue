<template lang="">
    <div class="wrapper">
        <h1 style="color: var(--headline-color)">农知问答</h1>
        <br />
        <Board>输入问题:</Board>
        <Board>
            <div class="flex-row">
                <input
                    class="inputItem"
                    style="width: 70%"
                    v-model="searchQuestion"
                    placeholder="Enter Text..."
                />&nbsp;
                <button
                    @click="performSearch"
                    class="searchButton"
                    style="width: 15%"
                >
                    提交
                </button>
            </div>
            <!-- 热门搜索 -->
            <div class="hotLinks">
                <p>热门搜索:
                    <a href="#" class="itemLink" v-for="itemLink in hotLinks" :key=itemLink> {{ itemLink.name }} </a>
                </p>
            </div>
        </Board>
        <br />
        <div class="row">
            <div class="column left">
                <Board>答案：</Board>
                <Board>
                    <p>这里是答案。</p>
                </Board>
            </div>
            <div class="column right">
                <Board>图谱显示：</Board>
                <Board>
                    <div
                        id="relationGraph"
                        style="height: 400px; width: 100%"
                    ></div>
                </Board>
            </div>
        </div>
    </div>
</template>
<script>
import './style/index.css'
import { generateRelationGraph } from './scripts/utils.js'
export default {
    data() {
        return {
            entity: '',
            data: [],
            link: [],
            hotLinks: [
                { id: 0, name: '崇明县适合种植什么植物？' },
                { id: 1, name: '胡萝卜汁含有哪些营养成分?' },
                { id: 2, name: '中国首都的天气类型是什么？' }
            ]
        }
    },
    methods: {
        performSearch() {
            // todo
        }
    },
    created() {
        // 向后端请求，得到data，link
        this.data = [
            { name: '张三', symbolSize: 20, c: 1 },
            { name: '李四', symbolSize: 30, c: 1 },
            { name: '王五', symbolSize: 40, c: 1 },
            { name: '赵六', symbolSize: 30, c: 1 },
            { name: '小七', symbalSize: 40, c: 1 },
            { name: '小明', symbolSize: 30, c: 0 },
            { name: '小红', symbalSize: 40, c: 0 }
        ]
        this.link = [
            { source: '张三', target: '李四', label: '朋友' },
            { source: '李四', target: '王五', label: '同事' },
            { source: '王五', target: '小七', label: '同学' },
            { source: '张三', target: '小明', label: '朋友' },
            { source: '小明', target: '小红', label: '同事' },
            { source: '小红', target: '小七', label: '同学' }
        ]
    },
    mounted() {
        // 初始化echarts实例
        generateRelationGraph(
            document.querySelector('#relationGraph'),
            this.data,
            this.link
        )
    }
}
</script>

<style>
/* 热门搜索 */
.hotLinks {
    margin-left: 7%;
    margin-top: 1%;
    color: var(--headline-color);
    font-size: 10px;
}

.itemLink {
    margin-left: 1%;
    color: blue;
}
.itemLink:hover {
    font-size: 14px;
    color: var(--item-bg-color);
}

/* 创建两个不相等的列 */
.column {
  float: left;
}

/* 左列宽度 */
.column.left {
  width: 40%;
}

/* 右列宽度 */
.column.right {
  padding-left: 5%;
  width: 60%;
}
</style>
