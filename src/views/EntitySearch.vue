<template lang="">
    <div class="wrapper">
        <Board>
            <Title title="查询条件: "></Title>
        </Board>
        <Board class="flex-row">
            <input
                class="inputItem"
                style="width: 70%"
                v-model="entity"
                placeholder="输入实体名称"
            />
            <button
                @click="performSearch"
                class="searchButton"
                style="width: 15%"
            >
                查询
            </button>
        </Board>
        <br />
        <Board>
            <Title title="关系图"></Title>
        </Board>
        <Board>
            <RelationGraph
                :data="data"
                :link="link"
                isDraggable
                isAnimation
                v-if="this.isShow"
            >
            </RelationGraph>
            <h1 v-else style="color: grey; text-align: center;">暂无查询结果</h1>
        </Board>
        <br />
        <Board>
            <Title title="关系图表"></Title>
        </Board>
        <Form :link="link" v-if="this.isShow"></Form>
        <Board v-else>
            <h1 style="color: grey; text-align: center;">暂无查询结果</h1>
        </Board>
    </div>
</template>
<script>
export default {
    data() {
        return {
            entity: '',
            isShow: false,
            data: [],
            link: []
        }
    },
    methods: {
        performSearch() {
            // todo
            this.isShow = true
        }
    },
    created() {
        // 向后端请求，得到data，link
        this.data = [
            { name: '玉米', symbolSize: 30, c: 1 },
            { name: '蔬菜', symbolSize: 30, c: 1 },
            { name: '番茄', symbolSize: 30, c: 1 },
            { name: '大西瓜', symbolSize: 30, c: 1 },
            { name: '水果', symbalSize: 30, c: 1 },
            { name: '南开大学', symbalSize: 30, c: 0 },
            { name: '起名字好难啊', symbalSize: 30, c: 0 },
            { name: '大菠萝', symbalSize: 30, c: 0 }
        ]
        this.link = [
            { source: '蔬菜', label: '属于3', target: '南开大学' },
            { source: '水果', label: '属于2', target: '南开大学' },
            { source: '大西瓜', label: '属于1', target: '水果' },
            { source: '番茄', label: '属于0', target: '蔬菜' },
            { source: '玉米', label: '属于5', target: '蔬菜' },
            { source: '起名字好难啊', label: '属于4', target: '南开大学' },
            { source: '大菠萝', label: '属于6', target: '水果' }
        ]
    }
}
</script>
