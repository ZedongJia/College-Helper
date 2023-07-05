<template>
    <div class="wrapper overviewlayout">
        <Board style="grid-column: 1 / 2">
            <span style="font-size: larger"
                >分类专题： [{{ $store.getters.getCurrNode.nodename }}] <br
            /></span>
            <div
                style="width: 100%"
                v-for="key in Object.keys(sortedList)"
                :key="key"
            >
                <p
                    v-if="hasChildren(sortedList[key])"
                    style="
                        margin: 16px 0;
                        width: 64px;
                        height: 24px;
                        line-height: 24px;
                        background-color: var(--item-bg-rev-color);
                        text-align: center;
                    "
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
<<<<<<< HEAD
        <div style="dispaly: grid; grid-template-rows: 200px 1fr 1fr">
            <Board>
                分类导航:
                <button
                    class="searchButton flex-column"
                    @click="outFrame"
                    style="margin: 20px 0; width: 100%"
                >
                    显示
                </button>
            </Board>
            <Board style="margin-top: 20%">
                上级分类：<br /><span style="font-size: small">{{
                    $store.getters.getCurrNode.parent
                }}</span></Board
            >
            <Board style="margin-top: 20%">
                下级分类：
                <p
                    v-if="
                        !hasChildren(this.$store.getters.getCurrNode.children)
                    "
                    style="font-size: small"
                >
                    已是最低级分类
                </p>
                <p
                    v-for="i in $store.getters.getCurrNode.children"
                    :key="i"
                    style="font-size: small"
                >
                    {{ i.name }}
                </p>
            </Board>
        </div>
=======
        <Board style="grid-column: 2 / 5">
            上级分类：{{ $store.getters.getCurrNode.parent }}</Board
        >
        <Board style="grid-column: 2 / 5">
            下级分类：
            <p
                v-for="i in $store.getters.getCurrNode.children"
                :key="i"
            >
                {{ i.name }}
            </p>
        </Board>
>>>>>>> c4241b87ceae164ae96fcdc5785ec6ca79ab9f4b
    </div>
    <PopFrame v-if="appear">
        <div style="width: 50%; margin: 50px auto">
            <Board> 农业分类树 </Board>
            <Board
                style="
                    min-height: 400px;
                    max-height: 500px; /* 设置容器的最大高度 */
                    overflow-y: auto; /* 添加垂直滚动条 */
                "
            >
                <Tree :model="treeData"></Tree>
            </Board>
            <Board>
                <button
                    class="searchButton"
                    @click="outFrame"
                    style=""
                >
                    返回
                </button>
            </Board>
        </div>
    </PopFrame>
</template>
<script>
import './style/index.css'
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
            console.log(children)
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
    mounted() {
        this.$store.commit('updateCurrNode', {
<<<<<<< HEAD
            parent: '已是最高级分类',
            children: treeData.children,
            nodename: treeData.name
=======
            parent: '',
            children: []
>>>>>>> c4241b87ceae164ae96fcdc5785ec6ca79ab9f4b
        })
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
