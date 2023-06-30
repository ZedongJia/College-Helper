<template lang="">
    <div class="wrapper">
        <Board> 查询条件: </Board>
        <Board class="entitySearch">
            <input
                class="inputItem"
                style="width: 512px"
                v-model="entitySearch"
                placeholder="输入实体名称"
            />
            <button
                @click="performSearch"
                class="searchButton"
                style="width: 128px"
            >
                查询
            </button>
        </Board>
        <Board style="margin-top: 20px"> 关系图 </Board>
        <Board>
            <div
                id="realtionGraph"
                style="height: 400px; width: 100%"
            ></div>
        </Board>
    </div>
</template>
<script>
export default {
    data() {
        return {
            colors: ['black', 'blue', 'green'],
            entitySearch: '',
            option: {
                series: [
                    {
                        type: 'graph',
                        layout: 'force',
                        roam: true,
                        animation: true,
                        // 数据点
                        data: [
                            { name: '张三', symbolSize: 20, c: 1 },
                            { name: '李四', symbolSize: 30, c: 1 },
                            { name: '王五', symbolSize: 40, c: 1 },
                            { name: '赵六', symbolSize: 30, c: 1 },
                            { name: '小七', symbalSize: 40, c: 1 },
                            { name: '小明', symbolSize: 30, c: 0 },
                            { name: '小红', symbalSize: 40, c: 0 }
                        ],
                        // 边
                        links: [
                            { source: '张三', target: '李四', label: '朋友' },
                            { source: '李四', target: '王五', label: '同事' },
                            { source: '王五', target: '小七', label: '同学' },
                            { source: '张三', target: '小明', label: '朋友' },
                            { source: '小明', target: '小红', label: '同事' },
                            { source: '小红', target: '小七', label: '同学' }
                        ],
                        // 数据点名称设置
                        label: {
                            show: true,
                            position: 'right',
                            formatter: '{b}',
                            distance: 20,
                            fontSize: 18,
                            align: 'center'
                        },
                        // 边设置
                        lineStyle: {
                            color: 'black',
                            opacity: 0.7,
                            width: 2,
                            curveness: 0
                        },
                        itemStyle: {
                            color: (params) => {
                                return this.colors[params.data.c]
                            }
                        },
                        // 边上文字设置
                        edgeLabel: {
                            show: true,
                            position: 'middle',
                            fontSize: 12,
                            formatter: (params) => {
                                return params.data.label
                            }
                        },
                        // 边的样式
                        edgeSymbol: ['none', 'arrow'],
                        edgeSymbolSize: [20, 8],
                        force: {
                            initLayout: 'circular',
                            repulsion: 200,
                            gravity: 0.01,
                            edgeLength: 200
                        },
                        focus: 'adjacency',
                        legendHoverLink: true
                    }
                ]
            }
        }
    },
    mounted() {
        // 初始化echarts实例
        const myChart = this.echarts.init(
            document.getElementById('realtionGraph')
        )
        // 渲染人物关系图
        myChart.setOption(this.option)
        // window.addEventListener('resize', resizeCharts);
        // 监听
        window.addEventListener('resize', () => {
            myChart.resize()
        })
    }
}
</script>

<style>
.entitySearch {
    height: 100px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
}
</style>
