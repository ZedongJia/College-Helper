<template>
    <ul class="tree">
        <TreeNode parent="root" :model="model"></TreeNode>
    </ul>
</template>
<script>
import TreeNode from './TreeNode.vue'
export default {
    components: {
        TreeNode
    },
    props: {
        model: Object
    }
}
</script>
<style>
.tree {
    padding: 0 1.5em;
}
.tree ul {
    padding-left: 2em;
    border-left: 1px solid var(--item-bg-color);
}
.tree, .tree span {
    animation: fade 0.75s forwards;
}
</style>
