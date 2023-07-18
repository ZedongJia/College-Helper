<template>
    <div
        :class="{
            normal: true,
            static: Static,
            dynamic: Dynamic,
            shade: !noShade
        }"
    >
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'MenuItem',
    props: {
        Static: Boolean,
        Dynamic: Boolean,
        noShade: Boolean
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
.shade {
    box-shadow: 7px 7px 10px 3px #24004628;
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
