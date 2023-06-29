<template>
    <div
    :class="{
        normal: true,
        static: Static,
        dynamic: Dynamic
    }"
    >
    <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        Static: Boolean,
        Dynamic: Boolean
    }
}
</script>
<style>
.normal {
    background-color: var(--item-bg-color);
    color: var(--item-font-color);
    border-radius: 2px;
    transition: 0.5s;
}
.dynamic:hover {
    transform: translate(10%, 0);
    background-color: var(--item-bg-rev-color);
    color: var(--item-font-rev-color);
}
.static:hover {
    background-color: var(--item-bg-rev-color);
    color: var(--item-font-rev-color);
}
</style>
