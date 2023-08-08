<template>
    <div class="wrapper fade-in">
        <Board>
            <Title title="查询条件: "></Title>
        </Board>
        <Board class="flex-row-center">
            <input
                class="inputItem"
                style="width: 70%"
                v-model="entity"
                placeholder="输入实体名称"
            />
            <Button
                @clickIt="performSearch"
                style="width: 15%"
            >
                查询
            </Button>
        </Board>
        <br />
        <Board>
            <Title title="关系图"></Title>
        </Board>
        <RelationGraph
            :isLoading="isLoading"
            :data="data"
            :link="link"
            isDraggable
            isAnimation
        >
        </RelationGraph>
        <br />
        <Board>
            <Title title="关系图表"></Title>
        </Board>
        <Table
            :colWidth="[35, 20, 35, 10]"
            :isLoading="isLoading"
            :header="['实体1', '关系', '实体2']"
            :link="link"
            isShowButton
            ButtonName="详情"
            @detail="detail"
        ></Table>
    </div>
</template>
<script>
import { loading } from '@/utils/callback'
import { IntelligentQuery } from '@/api/entity'
export default {
    data() {
        return {
            entity: '',
            isLoading: false,
            /**
             * data: [
             *  {name: String, symbolSize: int, c:int}
             * ]
             * @summary {name是节点名字, symbolSize是节点大小, c是节点颜色}
             */
            data: [],
            link: []
        }
    },
    methods: {
        performSearch() {
            // todo
            this.isLoading = true

            // waiting for data
            loading(() => {
                this.isLoading = false
                this.data = []
                this.link = []
                IntelligentQuery({
                    entity: this.entity
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
            // todo
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
<style></style>
