<template>
    <div class="wrapper">
        <br />
        <div
            class="card-layout"
            id="cardOffset"
        >
            <div
                class="group"
                v-for="(child, index) in CardGroupRefs"
                :key="index"
            >
                <CardGroup
                    ref="CardGroup"
                    :pages="someList"
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
            <div style="margin: 0 auto; width: 90%;">
                <Card style="max-height: 60px; padding: 1em; text-align: center">
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
            CardGroupRefs: [0, 1, 2, 3, 4, 5],
            Question: ['我今年考了700分，所有大学的任何专业任我挑自选吗？', '南开大学怎么样？', '455需要复读吗？']
        }
    },
    mounted() {
        const that = this
        that.someList = [
            {
                title: '清华',
                content: '清华大学（Tsinghua University）是中国著名高等学府。',
                link: '#'
            },
            {
                title: '北大',
                content: '柯洁局势不妙',
                link: '#'
            },
            {
                title: 'ww',
                content: '在ww的流水里',
                link: '#'
            },
            {
                title: '阿水',
                content: '别黑文波了',
                link: '#'
            },
            {
                title: '喻文波',
                content: '他是我们i文的信仰',
                link: '#'
            },
            {
                title: '杰克爱',
                content: '你在搜jackeylove',
                link: '#'
            }
        ]
    },
    methods: {
        Refresh() {
            const centerX = document.getElementById('cardOffset').clientWidth / 2 - 125
            const centerY = document.getElementById('cardOffset').clientHeight / 2 - 90
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

.card-layout>div {
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
