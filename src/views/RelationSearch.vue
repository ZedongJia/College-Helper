<template lang="">
    <div class="wrapper fade-in">
        <!-- 查询主界面 -->
        <board>
            <Title title="查询条件："></Title>
        </board>
        <board class="flex-row">
            <!-- 实体1 -->
            <input
                style="width: 30%"
                type="text"
                class="inputItem"
                placeholder="实体1"
                v-model="entity1"
            />
            <!-- 关系选择 -->
            <Option
                :data="options"
                default="选择关系"
                @choice="receiveOption"
            ></Option>
            <!-- 实体2 -->
            <input
                style="width: 30%"
                type="text"
                class="inputItem"
                placeholder="实体2"
                v-model="entity2"
            />
            <!-- 按钮 -->
            <button
                class="searchButton"
                style="margin: 0 10px; padding: 0 20px"
                @click="performSearch"
                id="btn"
            >
                搜索
            </button>
        </board>
        <!-- 关系图 -->
        <br />
        <Board>
            <Title title="关系图"></Title>
        </Board>
        <RelationGraph
            :data="data"
            :link="link"
            isDraggable
            isAnimation
            :isLoading="isLoading"
        >
        </RelationGraph>
        <br />
        <Board>
            <Title title="关系图表"></Title>
        </Board>
        <Form
            :isLoading="isLoading"
            :link="link"
        ></Form>
    </div>
</template>
<script>
import { loading } from '@/utils/loadingCallback'

export default {
    data() {
        return {
            isLoading: false,
            data: [],
            link: [],
            options: ['选项1', '选项2', '选项2', '选项2'],
            option: '',
            entity1: '',
            entity2: ''
        }
    },
    methods: {
        receiveOption(option) {
            this.option = option
        },
        performSearch() {
            // todo
            this.isLoading = true

            // waiting for data
            loading(() => {
                this.isLoading = false
                this.data = []
                this.link = []
            })
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
<style>
.item:hover {
    background-color: var(--item-bg-rev-color);
    color: var(--item-font-rev-color);
}
</style>
