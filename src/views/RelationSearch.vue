<template lang="">
    <div class="wrapper">
        <!-- 页面标题 -->
        <h1 style="color: gray">关系查询</h1>
        <br />
        <!-- 页面导航 -->
        <board><a href="#">主页</a>&nbsp;>&nbsp;关系查询</board>
        <br />
        <!-- 查询主界面 -->
        <board>查询条件：</board>
        <board
            style="
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
            "
        >
            <!-- 实体1 -->
            <input
                style="width: 25%"
                type="text"
                class="inputItem"
                placeholder="实体1"
            />
            <!-- 关系选择 -->
            <select
                style="
                    width: 25%;
                    margin-left: 5%;
                    margin-right: 5%;
                    outline: none;
                "
                class="inputItem"
                placeholder="实体1"
            >
                <option
                    values=""
                    selected
                    disabled
                >
                    选择关系
                </option>
                <option value="option1" class ="item">选项1</option>
                <option value="option2" class ="item">选项2</option>
                <option value="option3" class ="item">选项3</option>
            </select>
            <!-- 实体2 -->
            <input
                style="width: 25%"
                type="text"
                class="inputItem"
                placeholder="实体2"
            />
            <!-- 按钮 -->
            &nbsp;<button class="searchButton">搜索</button>
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
    created() {
        // 向后端请求，得到data，link
    },
    mounted() {
        // 初始化echarts实例
        generateRelationGraph(document.querySelector('#relationGraph'), [{ name: '张三', symbolSize: 20, c: 1 },
                            { name: '李四', symbolSize: 30, c: 1 },
                            { name: '王五', symbolSize: 40, c: 1 },
                            { name: '赵六', symbolSize: 30, c: 1 },
                            { name: '小七', symbalSize: 40, c: 1 },
                            { name: '小明', symbolSize: 30, c: 0 },
                            { name: '小红', symbalSize: 40, c: 0 }], [{ source: '张三', target: '李四', label: '朋友' },
                            { source: '李四', target: '王五', label: '同事' },
                            { source: '王五', target: '小七', label: '同学' },
                            { source: '张三', target: '小明', label: '朋友' },
                            { source: '小明', target: '小红', label: '同事' },
                            { source: '小红', target: '小七', label: '同学' }])
    }
}
</script>

<style>
.item:hover {
    background-color: var(--item-bg-rev-color);
    color: var(--item-font-rev-color);
}
</style>
