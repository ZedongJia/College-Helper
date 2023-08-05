<template>
    <div class="wrapper fade-in overviewlayout">
        <Board style="grid-column: 1 / 2">
            <Title :title="'分类专题： [' + node.name + ']'"></Title>
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
                    v-if="node.parent === 'root'"
                >
                    已是最高级分类
                </p>
                <span
                    @click="upskip(node, node.parent)"
                    v-else
                >
                    <div class="link-text">
                        <a>{{ node.parent }}</a>
                    </div>
                </span>
            </Board>
            <br />
            <Board>
                <Title
                    style="margin-bottom: 8px"
                    title="下级分类："
                ></Title>
                <p
                    style="color: grey"
                    v-if="!hasChildren(node.children)"
                >
                    已是最低级分类
                </p>
                <span
                    v-for="i in node.children"
                    :key="i"
                    @click="downskip(i, node.name)"
                    style="line-height: 30px"
                >
                    <div class="link-text">
                        <a>{{ i.name }}</a>
                    </div>
                </span>
            </Board>
        </div>
    </div>
    <PopFrame v-if="appear">
        <div style="width: 50%; margin: 50px auto">
            <Board>
                <Title title="分类树"></Title>
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
            <Board class="flex-row-right">
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
import { mapState } from 'vuex'
import Tree from './components/Tree'
import treeData from './tree.json'
const pinyin = require('js-pinyin')
export default {
    components: {
        Tree
    },
    data() {
        return {
            appear: false,
            treeData: treeData,
            childrenList: [],
            treeStack: []
        }
    },
    methods: {
        outFrame() {
            this.$store.commit('tree/show')
        },
        hasChildren(children) {
            return children !== undefined && children.length !== 0
        },
        dfsAllNodes(i, count = 0) {
            if (count === 1) {
                // 达到指定递归次数时停止递归
                return i.name
            }
            if (i.children) {
                for (let j = 0; j < i.children.length; j++) {
                    this.childrenList.push(
                        this.dfsAllNodes(i.children[j], count + 1)
                    )
                }
            }

            return i.name
        },
        upskip(node, parent) {
            this.$store.commit('tree/updateStack', {
                nodename: parent,
                updown: 'up'
            })
        },
        downskip(i, name) {
            this.$store.commit('tree/updateNode', {
                parent: name,
                children: i.children,
                name: i.name
            })
        }
    },
    computed: {
        ...mapState({
            isShow: (state) => state.tree.isShow,
            node: (state) => state.tree.currNode
        }),
        sortedList() {
            const sortedData = {}
            const collator = new Intl.Collator('zh')
            // 初始化分类
            for (let i = 65; i <= 90; i++) {
                const initial = String.fromCharCode(i)
                sortedData[initial] = []
            }
            if (this.childrenList && Array.isArray(this.childrenList)) {
                // this.childrenList.forEach((item) =>
                for (let i = 0; i < this.childrenList.length; i++) {
                    const item = this.childrenList[i]
                    // 获取首字母
                    if (item !== '') {
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
                    }
                }
            }
            return sortedData
        }
    },
    watch: {
        isShow() {
            this.appear = !this.appear
            this.childrenList = []
            this.dfsAllNodes(this.node)
        },
        node() {
            this.childrenList = []
            this.dfsAllNodes(this.node)
        }
    },
    created() {
        this.$store.commit('tree/updateNode', {
            parent: 'root',
            children: treeData,
            name: '省份'
        })
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
