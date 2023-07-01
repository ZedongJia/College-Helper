<template lang="">
    <div class="wrapper">
        <!-- 页面标题 -->
        <h1 style="color: var(--headline-color)"> {{ searchTitle }} </h1>
    </div>
</template>
<script>
import './style/index.css'
import { generateRelationGraph } from './scripts/utils.js'
export default {
    data() {
        return {
            searchTitle: '杂交水稻',
            titleLabels: [],
            content: ''
        }
    },
    methods: {
        receiveOption(option) {
            this.option = option
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
.item:hover {
    background-color: var(--item-bg-rev-color);
    color: var(--item-font-rev-color);
}
</style>
