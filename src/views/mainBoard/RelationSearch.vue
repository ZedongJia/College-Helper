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
import { addHistoryInfo } from '@/api/user'

export default {
    data() {
        return {
            isLoading: false,
            data: [],
            link: [],
            options: ['属于', '拥有', '制定', '执行', '任职', '参考', '相关', '坐落于', '毕业于'],
            map: { 属性: 'HAS', 拥有: 'BELONG_TO', 制定: 'SET', 执行: 'EXECUTE', 任职: 'TEACHING_IN', 参考: 'REFER', 相关: 'RELATED_TO', 坐落于: 'LOCATE', 毕业于: 'GRADUATED_FROM' },
            option: '',
            entity1: '',
            entity2: ''
        }
    },
    methods: {
        receiveOption(option) {
            this.option = this.map[option]
        },
        performSearch() {
            // todo
            this.isLoading = true
            // waiting for data
            loading(() => {
                RelationQuery({
                    entity1: this.entity1,
                    option: this.option,
                    entity2: this.entity2
                }).then((response) => {
                    this.data = JSON.parse(response.data).data
                    this.link = JSON.parse(response.data).link
                    this.isLoading = false
                }).catch((error) => {
                    console.log(error)
                    this.isLoading = false
                })
                    .then((data) => {
                        console.log(data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            })
            // 将搜索记录插入到历史记录表中
            console.log('------')
            addHistoryInfo({
                type: '关系查询',
                content: this.entity1 + '----' + this.option + '----' + this.entity2
            }).then(() => {
                console.log('添加成功')
            }).catch((error) => {
                console.log(error)
                // this.isLoading = false
            })
        },
        detail(item) {
            console.log('-----------')
            this.entity1 = item.source
            this.option = item.label
            this.entity2 = item.target
        }
    },
    created() {
        // 向后端请求，得到data，link
    }
}
</script>
<style>
.item:hover {
    background-color: var(--item-bg-rev-color);
    color: var(--item-font-rev-color);
}
</style>
