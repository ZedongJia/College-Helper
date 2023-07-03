<template>
    <ul class="tree">
        <TreeNode :model="model"></TreeNode>
    </ul>
</template>
<script>
export default {
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
</style>
