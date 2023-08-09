<template>
    <div class="wrapper">
        <br />
        <div
            class="card-layout"
            id="cardOffset"
        >
            <div
                class="group"
                v-for="(list,index) in someList"
                :key="index"
            >
                <CardGroup
                    ref="CardGroup"
                    :pages="list"
                ></CardGroup>
            </div>
        </div>
        <Button
            @click="Refresh"
            class="interest-button"
        >
            <span>换一换</span>
        </Button>
        <div
            v-for="q in Question"
            :key="q.id"
        >
            <br />
            <div style="margin: 0 auto; width: 90%">
                <Card
                    style="max-height: 60px; padding: 1em; text-align: center"
                >
                    <span>{{ q }}</span>
                </Card>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            someList: [],
            Question: [
                '我今年考了700分，所有大学的任何专业任我挑自选吗？',
                '南开大学怎么样？',
                '455需要复读吗？'
            ]
        }
    },
    mounted() {
        const that = this
        that.someList = [
            [
                {
                    title: '清华',
                    content:
                        '清华大学\n（Tsinghua University）是中国著名高等学府。',
                    link: '#'
                },
                {
                    title: '北大',
                    content:
                        '北京大学（Peking University），简称“北大”，坐落于北京市海淀区颐和园路零五号院',
                    link: '#'
                },
                {
                    title: '武汉大学',
                    content:
                        '武汉大学（Wuhan University），简称武大，位于武汉市',
                    link: '#'
                },
                {
                    title: '东南大学',
                    content:
                        '东南大学（Southeast University），简称“东大” [99] ，位于南京',
                    link: '#'
                },
                {
                    title: '天津大学',
                    content:
                        '天津大学（Tianjin University），简称“天大”，坐落于天津市',
                    link: '#'
                },
                {
                    title: '电子科技大学',
                    content: '电子科技大学，简称“电子科大”，坐落于四川省成都市',
                    link: '#'
                }
            ],
            [
                {
                    title: '北大',
                    content:
                        '北京大学（Peking University），简称“北大”，坐落于北京市海淀区颐和园路零五号院',
                    link: '#'
                },
                {
                    title: '武汉大学',
                    content:
                        '武汉大学（Wuhan University），简称武大，位于武汉市',
                    link: '#'
                },
                {
                    title: '清华',
                    content:
                        '清华大学（Tsinghua University）\n是中国著名高等学府。',
                    link: '#'
                },
                {
                    title: '东南大学',
                    content:
                        '东南大学（Southeast University），简称“东大” [99] ，位于南京',
                    link: '#'
                },
                {
                    title: '天津大学',
                    content:
                        '天津大学（Tianjin University），简称“天大”，坐落于天津市',
                    link: '#'
                },
                {
                    title: '电子科技大学',
                    content: '电子科技大学，简称“电子科大”，坐落于四川省成都市',
                    link: '#'
                }
            ],
            [
                {
                    title: '武汉大学',
                    content:
                        '武汉大学（Wuhan University），简称武大，位于武汉市',
                    link: '#'
                },
                {
                    title: '清华',
                    content:
                        '清华大学（Tsinghua University）\n是中国著名高等学府。',
                    link: '#'
                },
                {
                    title: '东南大学',
                    content:
                        '东南大学（Southeast University），简称“东大” [99] ，位于南京',
                    link: '#'
                },
                {
                    title: '天津大学',
                    content:
                        '天津大学（Tianjin University），简称“天大”，坐落于天津市',
                    link: '#'
                },
                {
                    title: '电子科技大学',
                    content: '电子科技大学，简称“电子科大”，坐落于四川省成都市',
                    link: '#'
                },
                {
                    title: '北大',
                    content:
                        '北京大学（Peking University），简称“北大”，坐落于北京市海淀区颐和园路零五号院',
                    link: '#'
                }
            ],
            [
                {
                    title: '东南大学',
                    content:
                        '东南大学（Southeast University），简称“东大” [99] ，位于南京',
                    link: '#'
                },
                {
                    title: '天津大学',
                    content:
                        '天津大学（Tianjin University），简称“天大”，坐落于天津市',
                    link: '#'
                },
                {
                    title: '电子科技大学',
                    content: '电子科技大学，简称“电子科大”，坐落于四川省成都市',
                    link: '#'
                },
                {
                    title: '北大',
                    content:
                        '北京大学（Peking University），简称“北大”，坐落于北京市海淀区颐和园路零五号院',
                    link: '#'
                },
                {
                    title: '武汉大学',
                    content:
                        '武汉大学（Wuhan University），简称武大，位于武汉市',
                    link: '#'
                },
                {
                    title: '清华',
                    content:
                        '清华大学（Tsinghua University）\n是中国著名高等学府。',
                    link: '#'
                }
            ],
            [
                {
                    title: '天津大学',
                    content:
                        '天津大学（Tianjin University），简称“天大”，坐落于天津市',
                    link: '#'
                },
                {
                    title: '电子科技大学',
                    content: '电子科技大学，简称“电子科大”，坐落于四川省成都市',
                    link: '#'
                },
                {
                    title: '北大',
                    content:
                        '北京大学（Peking University），简称“北大”，坐落于北京市海淀区颐和园路零五号院',
                    link: '#'
                },
                {
                    title: '武汉大学',
                    content:
                        '武汉大学（Wuhan University），简称武大，位于武汉市',
                    link: '#'
                },
                {
                    title: '清华',
                    content:
                        '清华大学（Tsinghua University）\n是中国著名高等学府。',
                    link: '#'
                },
                {
                    title: '东南大学',
                    content:
                        '东南大学（Southeast University），简称“东大” [99] ，位于南京',
                    link: '#'
                }
            ],
            [
                {
                    title: '电子科技大学',
                    content: '电子科技大学，简称“电子科大”，坐落于四川省成都市',
                    link: '#'
                },
                {
                    title: '北大',
                    content:
                        '北京大学（Peking University），简称“北大”，坐落于北京市海淀区颐和园路零五号院',
                    link: '#'
                },
                {
                    title: '武汉大学',
                    content:
                        '武汉大学（Wuhan University），简称武大，位于武汉市',
                    link: '#'
                },
                {
                    title: '清华',
                    content:
                        '清华大学（Tsinghua University）\n是中国著名高等学府。',
                    link: '#'
                },
                {
                    title: '东南大学',
                    content:
                        '东南大学（Southeast University），简称“东大” [99] ，位于南京',
                    link: '#'
                },
                {
                    title: '天津大学',
                    content:
                        '天津大学（Tianjin University），简称“天大”，坐落于天津市',
                    link: '#'
                }
            ]
        ]
    },
    methods: {
        Refresh() {
            const centerX =
                document.getElementById('cardOffset').clientWidth / 2 - 125
            const centerY =
                document.getElementById('cardOffset').clientHeight / 2 - 90
            this.$refs.CardGroup.forEach((child, index) => {
                child.Refresh(index, centerX, centerY)
            })
        }
    }
}
</script>
<style>
.card-layout {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
}

.card-layout > div {
    flex: 0 0 30%;
    margin-bottom: 50px;
}

.interest-button {
    position: absolute;
    top: 20px;
    right: -40px;
    min-width: 0;
    width: 40px;
    writing-mode: vertical-lr;
    align-items: center;
}

.group {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
