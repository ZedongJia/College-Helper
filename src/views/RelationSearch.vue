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
                type="text"
                class="inputItem"
                placeholder="实体1"
            />
            <!-- 关系选择 -->
            <select
                class="dropdown"
                placeholder="实体1"
            >
                <option
                    values=""
                    selected
                    disabled
                >
                    选择关系
                </option>
                <option value="option1">选项1</option>
                <option value="option2">选项2</option>
                <option value="option3">选项3</option>
            </select>
            <!-- 实体2 -->
            <input
                type="text"
                class="inputItem"
                placeholder="实体2"
            />
            <!-- 按钮 -->
            <button class="searchButton">搜索</button>
        </board>
        <!-- 关系图 -->
        <br />
        <board>关系图</board>
        <board>
            <div
                id="realtionGraph"
                style="height: 400px; width: 100%"
            ></div>
        </board>
    </div>
</template>
<script>
import './style/index.css'
// import { generateRelationGraph } from './scripts/utils.js'
export default {
    created() {
        // 向后端请求，得到data，link
    },
    mounted() {
        // 初始化echarts实例
        // generateRelationGraph()
    }
}
</script>
<style>
.dropdown {
    margin-left: 5%;
    margin-right: 5%;
    padding: 5px;
    width: 13%;
    border: 1px solid var(--item-bg-color);
}
</style>
