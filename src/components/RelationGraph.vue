<template lang="">
    <div
        ref="graph"
        style="height: 400px; width: 100%"
    ></div>
</template>
<script>
import { generateRelationGraph } from '@/utils/relationGraph'
export default {
    props: {
        data: Array,
        link: Array,
        isDraggable: Boolean,
        isAnimation: Boolean
    },
    mounted() {
        // 初始化echarts实例
        generateRelationGraph(
            this.$refs.graph,
            this.data,
            this.link,
            this.isDraggable,
            this.isAnimation
        )
    }
}
</script>
<style></style>
