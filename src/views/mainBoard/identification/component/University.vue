<!-- 字段
name text
honorTags json
imageUrls json

establishTime varchar(100)
detailLocation text

officialWebsite json
officialPhoneNumber json
officialEmail varchar(100)

rankInfo json
educationInfo json
intro
-->
<template>
    <div class="wrapper fade-in">
        <br />
        <div class="row">
            <div class="detail-layout">
                <!-- 左列 -->
                <Board class="left">
                    <!-- 第一部分：标题 + 词条 -->
                    <!-- 页面标题 -->
                    <Title> nothing{{ searchTitle }} </Title>
                    <!-- 词条 -->
                    <br />
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
                                    style="background-color: gray"
                                >
                                    {{ itemTable.key }}
                                </span>
                                <span
                                    class="value"
                                    style="background-color: gray"
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
                        <Title title="相关概念"></Title>
                        <br />
                        <!-- 关系 点 -->
                        <RelationGraph
                            fixHeight="200px"
                            :data="data"
                            :link="link"
                            inset
                        ></RelationGraph>
                    </Board>
                    <br />
                    <!-- 农业类型 -->
                    <Board>
                        <Title title="农业类型"></Title>
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
                        <Title title="实体类型"></Title>
                    </Board>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
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
    }
}
</script>

<style>
.line {
    margin-top: 3%;
    margin-bottom: 3%;
}

/* 两列 */
.detail-layout {
    display: flex;
    justify-content: center;
}
.detail-layout > :nth-child(1) {
    flex: 0 0 70%;
}
.detail-layout > :nth-child(2) {
    flex: 0 0 30%;
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
</style>
