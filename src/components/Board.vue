<template lang="">
    <div class="container">
        <slot></slot>
    </div>
</template>
<script>
export default {}
</script>
<style>
.container {
    padding: 10px;
    background-color: var(--bg-color);
    box-shadow: 0px 1px 5px var(--item-bg-color);
}
</style>
