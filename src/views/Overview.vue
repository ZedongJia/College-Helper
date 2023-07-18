<template>
    <div class="wrapper fade-in overviewlayout">
        <Board style="grid-column: 1 / 2">
            <Title
                :title="
                    '分类专题： [' + $store.getters.getCurrNode.nodename + ']'
                "
            ></Title>
            <div
                style="width: 100%"
                v-for="key in Object.keys(sortedList)"
                :key="key"
            >
                <p
                    v-if="hasChildren(sortedList[key])"
                    class="label"
                >
                    {{ key }}
                </p>
                <div class="categray">
                    <p
                        v-for="item in sortedList[key]"
                        :key="item"
                    >
                        {{ item }}
                    </p>
                </div>
            </div>
        </Board>
        <div style="dispaly: grid; grid-template-rows: 200px 1fr 1fr">
            <Board>
                <Title title="分类导航:"></Title>
                <br />
                <Button
                    @clickIt="outFrame"
                    style="width: 100%"
                >
                    显示
                </Button>
            </Board>
            <br />
            <Board>
                <Title
                    style="margin-bottom: 8px"
                    title="上级分类："
                ></Title>
                <p
                    style="color: grey"
                    v-if="$store.getters.getCurrNode.parent === 'root'"
                >
                    已是最高级分类
                </p>
                <span v-else> {{ $store.getters.getCurrNode.parent }} </span>
            </Board>
            <br />
            <Board>
                <Title
                    style="margin-bottom: 8px"
                    title="下级分类："
                ></Title>
                <p
                    style="color: grey"
                    v-if="
                        !hasChildren(this.$store.getters.getCurrNode.children)
                    "
                >
                    已是最低级分类
                </p>
                <p
                    style="margin-bottom: 8px"
                    v-for="i in $store.getters.getCurrNode.children"
                    :key="i"
                >
                    {{ i.name }}
                </p>
            </Board>
        </div>
    </div>
    <PopFrame v-if="appear">
        <div style="width: 50%; margin: 50px auto">
            <Board>
                <Title title="农业分类树"></Title>
            </Board>
            <Board
                style="
                    min-height: 400px;
                    max-height: 500px; /* 设置容器的最大高度 */
                    overflow-y: auto; /* 添加垂直滚动条 */
                "
            >
                <Tree :model="treeData"></Tree>
            </Board>
            <Board
                class="flex-row-right"
            >
                <Button
                    @clickIt="outFrame"
                    style="padding: 0 3em"
                >
                    返回
                </Button>
            </Board>
        </div>
    </PopFrame>
</template>
<script>
const pinyin = require('js-pinyin')
const treeData = {
    name: '农业',
    children: [
        { name: '养鱼业' },
        { name: '种花业' },
        {
            name: '驯养动物',
            children: [
                {
                    name: '畜牧业',
                    children: [{ name: '家畜' }]
                },
                {
                    name: '种植业',
                    children: [{ name: '树' }]
                },
                {
                    name: '畜牧业',
                    children: [{ name: '家畜' }]
                },
                {
                    name: '种植业',
                    children: [
                        { name: '树' },
                        {
                            name: '畜牧业',
                            children: [{ name: '家畜' }]
                        },
                        {
                            name: '种植业',
                            children: [
                                { name: '树' },
                                {
                                    name: '畜牧业',
                                    children: [{ name: '家畜' }]
                                },
                                {
                                    name: '种植业',
                                    children: [
                                        { name: '树' },
                                        {
                                            name: '畜牧业',
                                            children: [{ name: '家畜' }]
                                        },
                                        {
                                            name: '种植业',
                                            children: [
                                                { name: '树' },
                                                {
                                                    name: '畜牧业',
                                                    children: [{ name: '家畜' }]
                                                },
                                                {
                                                    name: '种植业',
                                                    children: [{ name: '树' }]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
export default {
    data() {
        return {
            appear: false,
            treeData,
            childrenList: [],
            node: []
        }
    },
    methods: {
        outFrame() {
            this.$store.commit('updateShowTree')
        },
        hasChildren(children) {
            return children !== undefined && children.length !== 0
        },
        dfsAllNodes(i) {
            if (i.children) {
                for (let j = 0; j < i.children.length; j++) {
                    this.childrenList.push(this.dfsAllNodes(i.children[j]))
                }
            }
            return i.name
        }
    },
    watch: {
        '$store.getters.isShowTree'() {
            this.appear = !this.appear
            this.node = this.$store.getters.getCurrNode
            this.childrenList = []
            this.dfsAllNodes(this.node)
        }
    },
    created() {
        this.$store.commit('updateCurrNode', {
            parent: 'root',
            children: treeData.children,
            nodename: treeData.name
        })
    },
    mounted() {
        this.node = this.$store.getters.getCurrNode
        this.dfsAllNodes(this.node)
    },
    computed: {
        sortedList() {
            const sortedData = {}
            const collator = new Intl.Collator('zh')
            // 初始化分类
            for (let i = 65; i <= 90; i++) {
                const initial = String.fromCharCode(i)
                sortedData[initial] = []
            }
            if (this.childrenList && Array.isArray(this.childrenList)) {
                this.childrenList.forEach((item) => {
                    // 获取首字母
                    const initial =
                        collator.compare(
                            pinyin.getFullChars(item[0])[0],
                            'A'
                        ) >= 0 &&
                        collator.compare(
                            pinyin.getFullChars(item[0])[0],
                            'Z'
                        ) <= 0
                            ? pinyin.getFullChars(item[0])[0]
                            : ''
                    if (!sortedData[initial]) {
                        sortedData[initial] = []
                    }
                    sortedData[initial].push(item)
                })
            }
            return sortedData
        }
    }
}
</script>
<style>
.overviewlayout {
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-column-gap: 5%;
}
.label {
    margin: 16px 0;
    width: 64px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background-color: var(--item-bg-rev-color);
    box-shadow: 0 2px 5px var(--item-bg-color);
    border: none;
    border-radius: 5px;
}
.categray {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
}
.categray > p {
    flex: 0 0 25%;
    padding-bottom: 0.5em;
}
</style>
