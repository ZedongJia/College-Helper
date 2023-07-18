<template>
    <Board
        class="flex-row-center wrapper"
        style="
            margin-bottom: 20px;
            justify-content: left;
            background-color: var(--item-bg-color);
        "
    >
        <transition-group
            name="slide-l"
        >
            <router-link
                class="link"
                v-for="(p, index) in pathList"
                :key="index"
                :to="getPath(index)"
            >
                <img
                    style="width: 32px"
                    :src="getIcon(p)"
                    alt="..."
                />
                <p>{{ getCHName(p) }} ></p>
            </router-link>
        </transition-group>
    </Board>
</template>
<script>
export default {
    name: 'RouteNav',
    data() {
        return {
            pathList: [],
            icons: ['home', 'search', 'entity', 'relation', 'graph', 'chat']
        }
    },
    methods: {
        recalculatePath() {
            const newPathList = this.$route.fullPath
                .split('/')
                .filter((item) => item !== '')
            this.pathList = newPathList
        },
        getCHName(en) {
            switch (en) {
                case 'identification':
                    return '实体识别'
                case 'entitySearch':
                    return '实体查询'
                case 'relationSearch':
                    return '关系查询'
                case 'overview':
                    return '农业知识概览'
                case 'mainBoard':
                    return '主页'
                case 'agriculturalQA':
                    return '农知问答'
            }
            if (en.startsWith('detailContent')) {
                return decodeURI(en).split('=')[1] + '-详情页面'
            } else {
                return '未命名'
            }
        },
        getPath(index) {
            let path = ''
            for (let i = 0; i <= index; i++) {
                path += '/' + this.pathList[i]
            }
            return path
        },
        getIcon(en) {
            let icon = ''
            switch (en) {
                case 'identification':
                    icon = 'search'
                    break
                case 'entitySearch':
                    icon = 'entity'
                    break
                case 'relationSearch':
                    icon = 'relation'
                    break
                case 'overview':
                    icon = 'graph'
                    break
                case 'mainBoard':
                    icon = 'home'
                    break
                case 'agriculturalQA':
                    icon = 'chat'
                    break
            }
            if (en.startsWith('detailContent')) {
                icon = 'content'
            }
            return icon !== '' ? require('../assets/icons/' + icon + '.png') : ''
        }
    },
    mounted() {
        this.recalculatePath()
    },
    watch: {
        '$route.fullPath'() {
            this.recalculatePath()
        }
    }
}
</script>
<style>
.link {
    display: flex;
    margin-right: 1em;
    height: 32px;
    line-height: 32px;
    color: var(--item-font-color);
    transition: 1s;
}
.link:last-child {
    font-weight: bold;
}
.link:hover {
    color: var(--item-font-rev-color);
    animation: bounce 0.25s;
}
</style>
