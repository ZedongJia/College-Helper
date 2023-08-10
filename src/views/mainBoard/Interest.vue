<template>
    <div class="wrapper">
        <br />
        <div
            class="card-layout"
            id="cardOffset"
        >
            <div
                class="group"
                v-for="(list, index) in someList"
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
import { mapGetters } from 'vuex'
export default {
    data() {
        return {
            showList: [],
            Question: [
                '我今年考了700分，所有大学的任何专业任我挑自选吗？',
                '南开大学怎么样？',
                '455需要复读吗？'
            ]
        }
    },
    computed: {
        ...mapGetters({
            someList: 'interest/getSomeList'
        })
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
            this.$store.dispatch('interest/update')
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
