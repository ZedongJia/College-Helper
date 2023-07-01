<template lang="">
    <div class="wrapper">
        <!-- 页面标题 -->
        <h1 style="color: var(--headline-color)">关系查询</h1>
        <br />
        <!-- 查询主界面 -->
        <board>查询条件：</board>
        <board class="flex-row">
            <!-- 实体1 -->
            <input
                style="width: 30%"
                type="text"
                class="inputItem"
                placeholder="实体1"
            />
            <!-- 关系选择 -->
            <Option
                :data="options"
                default="选择关系"
                @choice="receiveOption"
            ></Option>
            <!-- 实体2 -->
            <input
                style="width: 30%"
                type="text"
                class="inputItem"
                placeholder="实体2"
            />
            <!-- 按钮 -->
            <button class="searchButton" style="margin: 0 10px; padding: 0 20px;">搜索</button>
        </board>
        <!-- 关系图 -->
        <br />
        <board>关系图</board>
        <board>
            <div
                id="relationGraph"
                style="height: 400px; width: 100%"
            ></div>
        </board>
    </div>
</template>
<script>
import './style/index.css'
import { generateRelationGraph } from './scripts/utils.js'
export default {
    data() {
        return {
            data: [],
            link: [],
            options: ['选项1', '选项2', '选项2', '选项2'],
            option: ''
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
