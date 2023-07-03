<template>
    <li>
        <!-- list-style-image:url(../assets/icons/zengjia.png); -->
        <!-- 当前节点 -->
        <div class="tree-node">
            list-style-image:url(../assets/icons/zengjia.png)
            <div class="tree-line"></div>
            {{ model.name }}
            <span
                v-if="isFolder"
                class="toggle-icon"
                @click="toggle"
                >[进入分类]</span
            >
        </div>
        <ul v-if="isShow">
            <!--
        一个可以通过其“name”选项递归渲染自己的组件，
        (如果使用单文件组件，则从文件名推断)
      -->
            <Tree
                v-for="model in model.children"
                :model="model"
                :key="model.id"
            >
            </Tree>
        </ul>
    </li>
</template>
<script>
export default {
    name: 'Tree', // 在引用自身的时候是必须的
    props: {
        model: Object
    },
    data() {
        return {
            isShow: false
        }
    },
    computed: {
        isFolder() {
            return this.model.children !== undefined
        }
    },
    methods: {
        toggle() {
            if (this.isFolder) {
                this.isShow = !this.isShow
            }
        }
    }
}
</script>
<style>
.tree-node {
    position: relative;
    min-width: 100px;
    height: 32px;
    line-height: 32px;
}
.tree-line {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(-100%, -50%);
    width: 2em;
    height: 1px;
    background-color: var(--item-bg-color);
}
.toggle-icon {
    cursor: pointer;
    color: orange;
    position: relative;
}
</style>
