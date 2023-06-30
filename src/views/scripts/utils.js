// /**
//  * 生成关系图
//  * @param {*} element 树节点
//  * @param {*} data 数据
//  * @param {*} link 关系
//  */
// function generateRelationGraph(element, data, link) {
//     // todo
//     colors = ['black', 'blue', 'green'],
//     entitySearch = '',
//     option {
//                 series: [
//                     {
//                         type: 'graph',
//                         layout: 'force',
//                         roam: true,
//                         animation: true,
//                         // 数据点
//                         data: [
//                             { name: '张三', symbolSize: 20, c: 1 },
//                             { name: '李四', symbolSize: 30, c: 1 },
//                             { name: '王五', symbolSize: 40, c: 1 },
//                             { name: '赵六', symbolSize: 30, c: 1 },
//                             { name: '小七', symbalSize: 40, c: 1 },
//                             { name: '小明', symbolSize: 30, c: 0 },
//                             { name: '小红', symbalSize: 40, c: 0 }
//                         ],
//                         // 边
//                         links: [
//                             { source: '张三', target: '李四', label: '朋友' },
//                             { source: '李四', target: '王五', label: '同事' },
//                             { source: '王五', target: '小七', label: '同学' },
//                             { source: '张三', target: '小明', label: '朋友' },
//                             { source: '小明', target: '小红', label: '同事' },
//                             { source: '小红', target: '小七', label: '同学' }
//                         ],
//                         // 数据点名称设置
//                         label: {
//                             show: true,
//                             position: 'right',
//                             formatter: '{b}',
//                             distance: 20,
//                             fontSize: 18,
//                             align: 'center'
//                         },
//                         // 边设置
//                         lineStyle: {
//                             color: 'black',
//                             opacity: 0.7,
//                             width: 2,
//                             curveness: 0
//                         },
//                         itemStyle: {
//                             color: (params) => {
//                                 return this.colors[params.data.c]
//                             }
//                         },
//                         // 边上文字设置
//                         edgeLabel: {
//                             show: true,
//                             position: 'middle',
//                             fontSize: 12,
//                             formatter: (params) => {
//                                 return params.data.label
//                             }
//                         },
//                         // 边的样式
//                         edgeSymbol: ['none', 'arrow'],
//                         edgeSymbolSize: [20, 8],
//                         force: {
//                             initLayout: 'circular',
//                             repulsion: 200,
//                             gravity: 0.01,
//                             edgeLength: 200
//                         },
//                         focus: 'adjacency',
//                         legendHoverLink: true
//                     }
//                 ]
//             }
// }
// export { generateRelationGraph }
