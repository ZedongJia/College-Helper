<template lang="">
    <h3 class="title">
        {{ title }}
    </h3>
</template>
<script>
export default {
    props: {
        title: String
    }
}
</script>
<style>
.title {
    cursor: default;
}
</style>
