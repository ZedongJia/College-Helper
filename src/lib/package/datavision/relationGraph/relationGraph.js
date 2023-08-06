import * as echarts from 'echarts'
/**
 * 生成关系图
 * @param {*} element 树节点
 * @param {*} data 数据
 * @param {*} link 关系
 * @param {*} isDraggable 是否可拖拽
 * @param {*} isAnimation 是否显示动画
 */
function generateRelationGraph (element, data, link, isDraggable, isAnimation) {
    // todo
    const colors = ['RGB(100, 149, 237)', 'RGB(72,209,204', 'RGB(72,209,204']
    const option = {
        series: [
            {
                type: 'graph',
                layout: 'force',
                symbolSize: 50,
                roam: isDraggable,
                animation: isAnimation,
                initLayout: 'circular',
                // 数据点
                data: data,
                // 边
                links: link,
                // 数据点名称设置
                label: {
                    show: true,
                    formatter: '{b}',
                    // distance: 20,
                    // fontSize: 18,
                    align: 'center',
                    textStyle: {
                        color: 'white' // 设置节点标签字体颜色为红色
                    }
                },
                // 边设置
                lineStyle: {
                    color: 'grey',
                    opacity: 1,
                    width: 2,
                    curveness: 0.1
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
                edgeSymbolSize: [0, 8],
                force: {
                    // 初始化动画
                    layoutAnimation: isAnimation,
                    repulsion: 20,
                    gravity: 0.01,
                    edgeLength: 200
                },
                focus: 'adjacency',
                legendHoverLink: true,
                draggable: true
            }
        ]
    }
    const newChart = echarts.init(element)
    // 渲染人物关系图
    newChart.setOption(option)
    // window.addEventListener('resize', resizeCharts);
    // 监听
    const listeningChart = () => {
        newChart.resize()
    }
    window.addEventListener('resize', listeningChart)
    return listeningChart
}

export { generateRelationGraph }
