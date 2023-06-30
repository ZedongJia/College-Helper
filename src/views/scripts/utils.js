import * as echarts from 'echarts'
/**
 * 生成关系图
 * @param {*} element 树节点
 * @param {*} data 数据
 * @param {*} link 关系
 */
function generateRelationGraph(element, data, link) {
    // todo
    const colors = ['black', 'blue', 'green']
    const option = {
        series: [
            {
                type: 'graph',
                layout: 'force',
                roam: true,
                animation: true,
                // 数据点
                data: data,
                // 边
                links: link,
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
                        return colors[params.data.c]
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
    const myChart = echarts.init(element)
    // 渲染人物关系图
    myChart.setOption(option)
    // window.addEventListener('resize', resizeCharts);
    // 监听
    window.addEventListener('resize', () => {
        myChart.resize()
    })
}

export { generateRelationGraph }
