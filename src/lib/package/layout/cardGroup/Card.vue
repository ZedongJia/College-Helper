<template>
    <div class="card">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'Card'
}
</script>
<style>
.card {
    border-radius: 20px;
    background-color: var(--item-bg-color);
    color: var(--item-font-color);
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px,
        rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
}
</style>
