<template>
    <div
        class="hide-button"
        @click="handleclick"
    >
        <div></div>
        <div></div>
        <div></div>
    </div>
</template>
<script>
export default {
    props: {
        isLight: Boolean
    },
    methods: {
        handleClick(e) {
            this.$emit('click', e)
        }
    }
}
</script>
<style>
.hide-button {
    cursor: pointer;
    display: flex;
    width: 48px;
    height: 32px;
    flex-flow: column nowrap;
    justify-content: space-evenly;
    align-items: center;
}
.hide-button > * {
    width: 32px;
    height: 4px;
    border-radius: 4px;
    background-color: var(--item-bg-color);
}
</style>
