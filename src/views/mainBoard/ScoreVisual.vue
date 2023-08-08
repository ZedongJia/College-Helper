<template>
    <div class="wrapper fade-in">
        <!-- 查询主界面 -->
        <board>
            <h1 style="color: grey">一分一段</h1>
            <hr class="boundary" />
            <Loading
                fixHeight="200px"
                v-if="pageIsLoading"
            ></Loading>
            <div v-else>
                <!-- 条件 -->
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
            </div>
                <hr class="boundary" />
                <!-- 查询框 -->
                <input
                    class="inputItem"
                    style="width: 70%; margin-left: 2%"
                    placeholder="请输入您的分数"
                    v-model="rankInfo.rankScore"
                />
                <Button
                    @clickIt="searchScore"
                    style="width: 15%"
                >
                    查询
                </Button>
                <hr class="boundary" />
                <!-- 折线图 -->
                <h3 class="titleScore">折线图</h3>
                <div class="stack-line">
                    <div class="gk-info gk-score">
                        <span style="margin-right: 3px">高考分数：</span>
                        <b>{{ rankInfo.rankScore }} 分</b>
                    </div>
                    <div class="gk-info">
                        <span style="margin-right: 3px">同分人数：</span>
                        <b>{{ rankInfo.rankNum }} 人</b>
                    </div>
                    <div class="gk-info">
                        <span
                            style="
                                margin-right: 3px;
                                margin-bottomm: 2px;
                                padding-bottom: 2px;
                            "
                            >排名区间：</span
                        >
                        <b>{{ rankInfo.rankRange }} 名</b>
                    </div>
                </div>
                <lineChart
                    :dataX="dataX"
                    :dataY="dataY"
                    :isLoading="scoreIsLoading || pageIsLoading"
                >
                </lineChart>
                <h3 class="titleScore">一分一段表</h3>
                <div style="max-height: 600px; overflow: scroll">
                    <Table
                        :isLoading="scoreIsLoading || pageIsLoading"
                        :link="link"
                        :header="['分数', '本段人数', '累计人数']"
                    ></Table>
                </div>
        </board>
    </div>
</template>
<script>
import './style/scoreVisual.css'
import { loading } from '@/utils/callback'
// import { addHistoryInfo } from '@/api/user'
import { getProYearsInfo, getCateDegreeInfo, getScoreInfo } from '@/api/entity'
import Loading from '@/lib/package/transition/Loading.vue'

export default {
    data() {
        return {
            pageIsLoading: false,
            scoreIsLoading: false,
            isChoosed: [0, 0, 0, 0],
            allCondition: [],
            scoreData: [],
            scoreKeys: [],
            rankInfo: {
                rankScore: '',
                rankNum: '-',
                rankRange: '-'
            },
            dataX: [],
            dataY: [],
            copy: [],
            link: []
        }
    },
    methods: {
        chooseType(index1, index2) {
            this.isChoosed[index1] = index2
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
            this.clear()
            // waiting for data
            loading(() => {
                getScoreInfo(params)
                    .then((response) => {
                        // 获取数据后，对数据进行操作
                        this.scoreData = JSON.parse(response.data).detail
                        this.scoreKeys = JSON.parse(response.data).keys
                        this.toLineChart()
                        this.scoreIsLoading = false
                    })
                    .catch(() => {
                        this.$store.commit('prompt/trigger', {
                            msg: '网络错误，请重试！',
                            level: 'warning'
                        })
                    })
            })
        },
        // 点击年份时
        clickYears(params) {
            this.scoreIsLoading = true
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
                .catch(() => {
                    this.$store.commit('prompt/trigger', {
                        msg: '网络错误，请重试！',
                        level: 'warning'
                    })
                })
        },
        // 点击省份时
        clickProvince(params) {
            this.scoreIsLoading = true
            this.clear()
            // waiting for data
            getProYearsInfo(params)
                .then((response) => {
                    this.pageIsLoading = false
                    const data = JSON.parse(response.data)
                    this.copy = []
                    this.copy.push({
                        title: '所在地区',
                        itemChoice: data.province
                    })
                    // 对年份排序
                    let years = data.years
                    years = years.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0))
                    this.copy.push({
                        title: '年份',
                        itemChoice: years
                    })
                    // 继续请求，默认最新一年的 category 与 degree
                    params.year = years[0]
                    this.clickYears(params)
                })
                .catch(() => {
                    this.$store.commit('prompt/trigger', {
                        msg: '网络错误，请重试！',
                        level: 'warning'
                    })
                })
        },
        // 处理数据
        toLineChart() {
            this.dataX = []
            this.dataY = []
            const temp1 = []
            for (let i = 0; i < this.scoreData.length; i++) {
                this.dataX.push(this.scoreData[i].rank)
                this.scoreData[i].value = this.scoreData[i].num
                // const temp = { value: scoreData[i].num, total: scoreData[i].total, batch_name: scoreData[i].batch_name }
                this.dataY.push(this.scoreData[i])
                temp1.push({
                    score: this.scoreKeys[i],
                    num: this.scoreData[i].num,
                    total: this.scoreData[i].total
                })
            }
            this.link = temp1
        },
        // 判断分数是否合理
        isRightScore() {
            const t = Number(this.rankInfo.rankScore)
            const max = Number(this.scoreKeys[this.scoreKeys.length - 1].split('-')[1])
            return isNaN(t) || t < 0 || t > max
        },
        // 获取所查看分数的相关信息
        getScoreInfo() {
            let t = 0
            for (let i = 0; i < this.scoreKeys.length; i++) {
                if (this.scoreKeys[i].includes('-')) {
                    if (this.scoreKeys[i].split('-')[0] <= this.rankInfo.rankScore && this.scoreKeys[i].split('-')[1] >= this.rankInfo.rankScore) {
                        t = i
                        break
                    }
                } else {
                    if (this.scoreKeys[i] === this.rankInfo.rankScore) {
                        t = i
                        break
                    }
                }
            }
            this.rankInfo.rankNum = this.scoreData[t].num
            this.rankInfo.rankRange = this.scoreData[t].rank_range
        },
        // 清空相关信息
        clear() {
            this.rankInfo.rankScore = ''
            this.rankInfo.rankNum = '-'
            this.rankInfo.rankRange = '-'
        },
        // 查看分数的相关信息
        searchScore() {
            // 获得当前 scoreKeys 中自己的位置
            if (this.isRightScore()) {
                this.$store.commit('prompt/trigger', {
                    msg: '请输入正确的分数！',
                    level: 'warning'
                })
                this.clear()
            } else {
                this.getScoreInfo()
            }
        }
    },
    created() {
        this.pageIsLoading = true
        loading(() => {
            this.pageIsLoading = true
            this.clickProvince({ provinceName: '北京' })
        })
    },
    components: { Loading }
}
</script>
<style>
.item:hover {
    background-color: var(--item-bg-rev-color);
    color: var(--item-font-rev-color);
}
</style>
