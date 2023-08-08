<template>
    <div class="wrapper fade-in">
        <!-- 查询主界面 -->
        <board>
            <h1 style="color: grey">一分一段</h1>
            <div>
                <!-- 条件 -->
                <hr class="boundary" />
                <div class="condition">
                    <div
                        class="conditionItem"
                        v-for="(condition, index1) in allCondition"
                        :key="index1"
                    >
                        <div class="conditionItemHead">
                            <span>{{ condition.title }}</span>
                        </div>
                        <div style="padding-left: 107px">
                            <span
                                v-for="(choice, index2) in condition.itemChoice"
                                :key="index2"
                                class="conditionItemList"
                                :style="{
                                    color:
                                        index2 === isChoosed[index1]
                                            ? '#eda01f'
                                            : ''
                                }"
                                @click="chooseType(index1, index2)"
                                ><a>{{ choice }}</a></span
                            >
                        </div>
                    </div>
                </div>
                <hr class="boundary" />
                <!-- 查询框 -->
                <input
                    class="inputItem"
                    style="width: 70%; margin-left: 2%"
                    v-model="myScore"
                    placeholder="请输入您的分数"
                />
                <Button
                    @clickIt="clickProvince"
                    style="width: 15%"
                >
                    查询
                </Button>
                <hr class="boundary" />
                <!-- 折线图 -->
                <Title title="折线图"></Title>
                <lineChart
                    :dataX="dataX"
                    :dataY="dataY"
                    :isLoading="scoreIsLoading || pageIsLoading"
                    >
                </lineChart>
                <Title title="一分一段表"></Title>
                <div style="max-height: 600px; overflow: scroll;">
                    <Table
                        :isLoading="scoreIsLoading || pageIsLoading"
                        :link="link"
                        :header="[ '分数', '本段人数', '累计人数']"
                    ></Table>
                </div>
            </div>
        </board>
    </div>
</template>
<script>
import './style/scoreVisual.css'
import { loading } from '@/utils/callback'
// import { addHistoryInfo } from '@/api/user'
import { getProYearsInfo, getCateDegreeInfo, getScoreInfo } from '@/api/entity'

export default {
    data() {
        return {
            pageIsLoading: false,
            typeIsLoading: false,
            scoreIsLoading: false,
            isChoosed: [0, 0, 0, 0],
            allCondition: [],
            myScore: '',
            dataX: [],
            dataY: [],
            copy: [],
            link: []
        }
    },
    methods: {
        chooseType(index1, index2) {
            this.isChoosed[index1] = index2
            console.log(index2)
            if (index1 === 0) {
                // 点击省份
                this.clickProvince({
                    provinceName:
                        this.allCondition[0].itemChoice[this.isChoosed[0]]
                })
                this.isChoosed = [index2, 0, 0, 0]
            } else if (index1 === 1) {
                // 点击年份
                this.clickYears({
                    provinceName:
                        this.allCondition[0].itemChoice[this.isChoosed[0]],
                    year: this.allCondition[1].itemChoice[this.isChoosed[1]]
                })
                this.isChoosed[2] = 0
                this.isChoosed[3] = 0
            } else {
                // 点击成绩类型或考生类别
                this.clickCateDegree({
                    provinceName:
                        this.allCondition[0].itemChoice[this.isChoosed[0]],
                    year: this.allCondition[1].itemChoice[this.isChoosed[1]],
                    category:
                        this.allCondition[2].itemChoice[this.isChoosed[2]],
                    degree:
                        this.allCondition.length === 4
                            ? this.allCondition[3].itemChoice[this.isChoosed[3]]
                            : '不分层次'
                })
            }
        },
        // 点击考生类别时
        clickCateDegree(params) {
            // todo
            this.scoreIsLoading = true
            // waiting for data
            loading(() => {
                getScoreInfo(params)
                    .then((response) => {
                        // 获取数据后，对数据进行操作
                        console.log(JSON.parse(response.data).detail)
                        this.toLineChart(JSON.parse(response.data).detail, JSON.parse(response.data).keys)
                        this.scoreIsLoading = false
                    })
                    .catch((error) => {
                        console.log(error)
                    })
                })
        },
        // 点击年份时
        clickYears(params) {
            // waiting for data
            getCateDegreeInfo(params)
                .then((response) => {
                    const data = JSON.parse(response.data)
                    this.copy.push({
                        title: '考生类别',
                        itemChoice: data.category
                    })
                    // 判断 degree 里面是否有有效元素
                    if (data.degree[0] !== '不分层次') {
                        this.copy.push({
                            title: '成绩类型',
                            itemChoice: data.degree
                        })
                    }
                    this.allCondition = this.copy
                    this.copy = []
                    this.copy.push(this.allCondition[0])
                    this.copy.push(this.allCondition[1])
                    // 继续请求，默认获得 category[0]、degree[0] 下的一分一段表
                    params.category = data.category[0]
                    params.degree = data.degree[0]
                    this.clickCateDegree(params)
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        // 点击省份时
        clickProvince(params) {
            // todo
            this.pageIsLoading = true
            // waiting for data
            getProYearsInfo(params)
                .then((response) => {
                    const data = JSON.parse(response.data)
                    this.copy = []
                    this.copy.push({
                        title: '所在地区',
                        itemChoice: data.province
                    })
                    // 对年份排序
                    let years = data.years
                    years = years.sort((a, b) =>
                        a < b ? 1 : a > b ? -1 : 0
                    )
                    this.copy.push({
                        title: '年份',
                        itemChoice: years
                    })
                    // 继续请求，默认最新一年的 category 与 degree
                    params.year = years[0]
                    this.clickYears(params)
                    this.pageIsLoading = false
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        toLineChart(scoreData, keys) {
            this.dataX = []
            this.dataY = []
            const temp1 = []
            console.log(scoreData)
            for (let i = 0; i < scoreData.length; i++) {
                this.dataX.push(scoreData[i].rank)
                scoreData[i].value = scoreData[i].num
                // const temp = { value: scoreData[i].num, total: scoreData[i].total, batch_name: scoreData[i].batch_name }
                this.dataY.push(scoreData[i])
                temp1.push({ score: keys[i], num: scoreData[i].num, total: scoreData[i].total })
            }
            this.link = temp1
        }
    },
    created() {
        this.clickProvince({ provinceName: '北京' })
    }
}
</script>
<style>
.item:hover {
    background-color: var(--item-bg-rev-color);
    color: var(--item-font-rev-color);
}
</style>
