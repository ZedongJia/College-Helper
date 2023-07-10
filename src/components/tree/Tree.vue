<template>
    <ul class="tree">
        <TreeNode parent="root" :model="model"></TreeNode>
    </ul>
</template>
<script>
export default {
    name: 'Tree',
    props: {
        model: Object
    }
}
</script>
<style>
.tree {
    padding: 0 1.5em;
    /* list-style-image:url(../assets/icons/zengjia.png) */
}
.tree ul {
    padding-left: 2em;
    border-left: 1px solid var(--item-bg-color);
    /* list-style-image:url(../assets/icons/zengjia.png) */
}
.tree, .tree span {
    animation: fade 0.75s forwards;
}
</style>
