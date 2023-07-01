<!-- <template lang="">
    <Option :data="data" @choice="receive" default="nothing"></Option>
</template>
<script>
export default {
    data() {
        return {
            data: [
                '洋葱',
                '西红柿',
                '土豆'
            ]
        }
    },
    methods: {
        receive(msg) {
            console.log(msg)
        }
    }
}
</script>
<style lang=""></style> -->

<template lang="">
    <div class="wrapper">
        <br/>
        <div class="row">
            <div class="column left">
                <Board>
                    <!-- 页面标题 -->
                    <h1 style="color: var(--headline-color)"> {{ searchTitle }} </h1>
                    <!-- 词条 -->
                        <div class="itemLabel" v-for="itemLabel in titleLabels" :key=itemLabel> {{ itemLabel.name }} </div>
                        <!-- 第二部分 图片+文字 -->
                        <div>
                            <div class="row">
                                <p>这是一张图片</p>
                            </div>
                        </div>
                        <div>
                            <p>这是描述文字</p>
                        </div>
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
            searchTitle: '杂交水稻',
            titleLabels: [
                { id: 0, name: '中国传统文化' },
                { id: 1, name: '农业' },
                { id: 2, name: '农业气象百科' },
                { id: 3, name: '农作物' },
                { id: 4, name: '植物' },
                { id: 5, name: '生物技术' },
                { id: 6, name: '自然' }
            ],
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
/* 创建两个不相等的列 */
.column {
  float: left;
}

/* 左列宽度 */
.column.left {
  width: 70%;
}

/* 右列宽度 */
.column.right {
  padding-left: 5%;
  width: 30%;
}

.itemLabel {
  min-width: 20px;
  max-width: 300px;
  margin-right: 0.5%;
  margin-top: 1%;
  padding: 5px;
  color: white;
  background-color: rgb(51, 187, 233);
  font-size: 10px;
  border-radius: 12px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
