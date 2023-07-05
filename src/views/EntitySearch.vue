<template lang="">
    <div class="wrapper">
        <Board> 查询条件: </Board>
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
        <Board> 关系图 </Board>
        <Board>
            <RelationGraph
                :data="data"
                :link="link"
                isDraggable
                isAnimation
            >
            </RelationGraph>
        </Board>
        <br />
        <Form :link="link"></Form>
    </div>
</template>
<script>
import './style/index.css'
export default {
    data() {
        return {
            entity: '',
            data: [],
            link: []
        }
    },
    methods: {
        performSearch() {
            // todo
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
