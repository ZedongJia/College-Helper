<template>
    <div class="wrapper fade-in">
        <!-- 查询主界面 -->
        <board>
            <Title title="查询条件："></Title>
        </board>
        <board class="flex-row-center">
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
            <Button
                style="margin: 0 10px; padding: 0 20px"
                @clickIt="performSearch"
                id="btn"
            >
                搜索
            </Button>
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
        <Table
            :colWidth="[35, 20, 35, 10]"
            :isLoading="isLoading"
            :link="link"
            :header="['实体1', '关系', '实体2']"
            isShowButton
            ButtonName="详情"
            @detail="detail"
        ></Table>
    </div>
</template>
<script>
import { loading } from '@/utils/callback'
import { RelationQuery } from '@/api/entity'

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
                // this.data = []
                // this.link = []
                RelationQuery({
                    entity1: this.entity1,
                    option: this.option,
                    entity2: this.entity2
                })
                    .then((data) => {
                        console.log(data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
        },
        detail(item) {
            this.entity1 = item.source
            this.option = item.label
            this.entity2 = item.target
        }
    },
    created() {
        // 向后端请求，得到data，link
        this.data = [
            { name: '玉米', c: 1 },
            { name: '蔬菜', c: 1 },
            { name: '番茄', c: 1 },
            { name: '大西瓜', c: 1 },
            { name: '水果', c: 1 },
            { name: '南开大学', c: 0 },
            { name: '起名字好难啊', c: 0 },
            { name: '大菠萝', c: 0 }
        ]
        this.link = [
            { source: '蔬菜', label: ['属于2', '属于3'], target: '南开大学' },
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
