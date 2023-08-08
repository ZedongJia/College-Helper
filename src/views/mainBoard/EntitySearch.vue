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
                IntelligentQuery({
                    entity: this.entity
                })
                    .then((response) => {
                        const node = JSON.parse(response.data)
                        console.log(node.data)
                        console.log(node.link)
                        this.data = node.data
                        this.link = node.link
                        this.isLoading = false
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
        },
        detail(item) {
            // todo
        }
    }
}
</script>
<style></style>
