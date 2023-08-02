<template>
    <div
        style="
            display: flex;
            justify-content: center;
            min-width: auto;
            overflow: auto;
            padding: 2em 0 0 0;
        "
    >
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
            style="
                display: flex;
                padding: 0;
                min-width: auto;
                align-items: center;
            "
        >
            <span style="writing-mode: vertical-lr">换一换</span>
        </Button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            someList: [],
            CardGroupRefs: [0, 1, 2, 3, 4, 5]
        }
    },
    mounted() {
        const that = this
        that.someList = [
            {
                title: '原神',
                content: '中国孩子使用',
                link: '#'
            },
            {
                title: '柯洁',
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
    padding: 0 3em 0.8em 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 5em;
    overflow: hidden;
}
.group {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
