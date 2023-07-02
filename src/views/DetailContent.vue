<template lang="">
    <div class="wrapper">
        <br />
        <div class="row">
            <div class="DetailContentColumns">
                <!-- 左列 -->
                <Board class="left">
                    <!-- 第一部分：标题 + 词条 -->
                    <!-- 页面标题 -->
                    <h1 style="color: var(--headline-color)">
                        {{ searchTitle }}
                    </h1>
                    <!-- 词条 -->
                    <div
                        class="itemLabel"
                        v-for="itemLabel in titleLabels"
                        :key="itemLabel"
                    >
                        {{ itemLabel.name }}
                    </div>
                    <hr class="line" />
                    <!-- 第二部分 图片 + 文字 -->
                    <!-- 图片 -->
                    <img
                        src="./images/test.png"
                        alt="该条目无图片"
                        class="image"
                    />
                    <!-- 文字 -->
                    <p class="text">{{ content }}</p>
                    <hr class="line" />
                    <!-- 第三部分： 表格 -->
                    <div
                        class="flex-row"
                        style="
                            justify-content: left;
                            flex-flow: row wrap;
                            margin: 2%;
                        "
                    >
                        <div
                            style="width: 50%"
                            v-for="itemTable in tableContent"
                            :key="itemTable"
                        >
                            <div v-if="itemTable.isodd">
                                <span
                                    class="key"
                                    style="background-color: lightgray"
                                >
                                    {{ itemTable.key }}
                                </span>
                                <span
                                    class="value"
                                    style="background-color: lightgray"
                                >
                                    {{ itemTable.value }}
                                </span>
                            </div>
                            <div v-else>
                                <span class="key"> {{ itemTable.key }} </span>
                                <span class="value">
                                    {{ itemTable.value }}
                                </span>
                            </div>
                        </div>
                    </div>
                </Board>
                <!-- 右列 -->
                <div class="right">
                    <!-- 相关概念 -->
                    <Board>
                        <h3 style="color: var(--headline-color)">相关概念</h3>
                        <br />
                        <!-- 关系 点 -->
                        <div
                            id="relationGraph"
                            style="height: 200px; width: 100%"
                        ></div>
                    </Board>
                    <br />
                    <!-- 农业类型 -->
                    <Board>
                        <h3 style="color: var(--headline-color)">农业类型</h3>
                        <div
                            class="flex-row"
                            style="justify-content: left; flex-flow: row wrap"
                        >
                            <div
                                v-for="(itemType, index) in AgriType"
                                :key="index"
                            >
                                <p
                                    v-if="index !== AgriType.length - 1"
                                    class="agriTypeText"
                                >
                                    {{ itemType.name }} >
                                </p>
                                <p
                                    v-else
                                    class="agriTypeText"
                                >
                                    {{ itemType.name }}
                                </p>
                            </div>
                        </div>
                    </Board>
                    <br />
                    <!-- 实体类型 -->
                    <Board>
                        <h3 style="color: var(--headline-color)">实体类型</h3>
                    </Board>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import './style/index.css'
import { generateRelationGraph } from './scripts/utils.js'
export default {
    props: {
        entity: String
    },
    data() {
        return {
            searchTitle: '',
            titleLabels: [],
            content: '',
            tableContent: [],
            data: [],
            link: [],
            AgriType: [],
            Entitytype: []
        }
    },
    methods: {
        receiveOption(option) {
            this.option = option
        }
    },
    created() {
        this.searchTitle = this.entity
        // 请求entity数据
        this.titleLabels = [
            { id: 0, name: '中国传统文化' },
            { id: 1, name: '农业' },
            { id: 2, name: '农业气象百科' },
            { id: 3, name: '农作物' },
            { id: 4, name: '植物' },
            { id: 5, name: '生物技术' },
            { id: 6, name: '自然' }
        ]
        this.content =
            '杂交水稻（hybrid rice）指选用两个在遗传上有一定差异，同时它们的优良性状又能互补的水稻品种进行杂交，生产具有杂种优势的第一代杂交种，就是杂交水稻。一般杂交水稻仅指由两个遗传背景相同的不育系和恢复系杂交后形成的第一代杂交种。大面积推广的杂交水稻主要是利用水稻雄性不育系作为遗传工具。中国是世界上第一个成功研发和推广杂交水稻的国家。杂交水稻具有个体高度杂合性，杂种后代出现性状分离，故需年年制种。和杂交水稻相对应的是常规水稻。'
        this.tableContent = [
            { id: 0, key: '中文名', value: '杂交水稻', isodd: true },
            { id: 1, key: '主要食材', value: '水稻', isodd: true },
            { id: 2, key: '中文学名', value: '杂交水稻', isodd: false },
            { id: 3, key: '别名', value: '超级水稻', isodd: false },
            { id: 4, key: '界', value: '植物界', isodd: true },
            { id: 5, key: '命名者', value: '袁隆平', isodd: true },
            { id: 6, key: '体征', value: '产量高', isodd: false }
        ]
        this.data = [
            { name: '张三', symbolSize: 0, c: 1 },
            { name: '李四', symbolSize: 0, c: 1 },
            { name: '王五', symbolSize: 0, c: 1 },
            { name: '赵六', symbolSize: 0, c: 1 },
            { name: '小明', symbolSize: 0, c: 0 },
            { name: '小红', symbolSize: 0, c: 0 }
        ]
        this.AgriType = [
            { id: 0, name: '农业' },
            { id: 1, name: '生物技术' },
            { id: 2, name: '杂交水稻' }
        ]
    },
    mounted() {
        // 初始化echarts实例
        generateRelationGraph(
            document.querySelector('#relationGraph'),
            this.data,
            this.link,
            // eslint-disable-next-line no-undef
            false,
            false
        )
    }
}
</script>

<style>
.line {
    margin-top: 3%;
    margin-bottom: 3%;
}

/* 两列 */
.DetailContentColumns {
    width: 100%;
}

/* 左列宽度 */
.left {
    float: left;
    width: 65%;
    justify-content: space-between;
}
/* 左列：图片 */
.left .image {
    float: left;
    width: 40%;
    margin: 5px;
}

@media screen and (max-width: 600px) {
  .left .image {
    width: 90%;
    margin: 5px;
  }
}

/* 左列：文字 */
.left .text {
    padding: 2px;
    margin-left: 10px;
    margin-right: 10px;
    text-indent: 2em;
    font-size: 18px;
    color: #333;
}

/* 左列： 表格 —— 键 + 值 */
.key,
.value {
    display: inline-block;
    width: 50%;
    padding: 1%;
}
.key {
    font-weight: bold;
}

/* 右列宽度 */
.right {
    float: right;
    padding-left: 5%;
    width: 35%;
}

/* 标签 */
.itemLabel {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    min-width: 20px;
    max-width: 300px;
    margin-right: 0.5%;
    margin-top: 1%;
    padding: 5px;
    color: white;
    background-color: var(--item-bg-color);
    font-size: 10px;
    border-radius: 12px;
    text-overflow: ellipsis;
}

/* 农业类型 */
.agriTypeText {
    display: inline-block;
    margin-top: 5px;
    margin-right: 5px;
}

/* 实体类型 */
</style>
