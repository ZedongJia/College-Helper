<template>
    <h3 class="title">
        {{ title }}
    </h3>
</template>
<script>
export default {
    name: 'Title',
    props: {
        title: String
    }
}
</script>
<style>
.title {
    cursor: default;
    height: 32px;
    line-height: 32px;
}
</style>
