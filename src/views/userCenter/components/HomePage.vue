<template lang="">
    <Board
        class="flex-column-evenly"
        style="padding: 10px;"
        inset
        >
        <br />
        <div class="flex-row-left info">
            <span class="aviator"></span>
        </div>
    </Board>
</template>
<script>
export default {}
</script>
<style>
.info {
    padding: 10px;
    width: 100%;
    border-bottom: 2px solid var(--item-bg-color);
}
.info > * {
    margin: 0 1em;
}
.aviator {
    width: 64px;
    height: 64px;
    border-radius: 64px;
    background-color: black;
}
</style>
