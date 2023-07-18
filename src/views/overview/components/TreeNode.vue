<template>
    <li>
        <!-- 当前节点 -->
        <div class="tree-node">
            <div class="tree-line"></div>
            <div
                class="flex-row"
                style="justify-content: left"
            >
                <img
                    @click="toggle"
                    v-if="isShow || !isFolder"
                    src="@/assets/icons/jianshao.png"
                    alt="-"
                />
                <img
                    @click="toggle"
                    v-else
                    src="@/assets/icons/zengjia.png"
                    alt="+"
                />
                <p style="cursor: default">{{ model.name }}</p>
                <span
                    class="toggle-icon"
                    @click="record"
                >
                    [进入分类]
                </span>
            </div>
        </div>
        <ul v-if="isShow">
            <!--
        一个可以通过其“name”选项递归渲染自己的组件，
        (如果使用单文件组件，则从文件名推断)
      -->
            <TreeNode
                v-for="m in model.children"
                :parent="model.name"
                :model="m"
                :key="m.name"
            >
            </TreeNode>
        </ul>
    </li>
</template>
<script>
export default {
    props: {
        parent: String,
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
        },
        record() {
            this.$store.commit('tree/updateNode', {
                parent: this.parent,
                children: this.model.children,
                name: this.model.name
            })
            this.$store.commit('tree/hide')
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
.tree-node img {
    cursor: pointer;
    width: 24px;
}
.tree-node img:hover {
    animation: bounce 0.25s;
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
