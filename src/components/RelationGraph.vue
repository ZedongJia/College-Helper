<template>
    <Board :inset="inset" class="fade-in">
        <Loading v-if="isLoading"></Loading>
        <EmptyHint v-if="isEmpty && !isLoading"></EmptyHint>
        <div
            v-if="!isEmpty && !isLoading"
            ref="graph"
            :style="{
                height: fixHeight,
                width: '100%'
            }"
        ></div>
    </Board>
</template>
<script>
import { generateRelationGraph } from '@/utils/relationGraph'
import { nextTick } from 'vue'
export default {
    name: 'RelationGraph',
    props: {
        fixHeight: {
            type: String,
            default: '400px'
        },
        inset: Boolean,
        isLoading: Boolean,
        data: Array,
        link: Array,
        isDraggable: Boolean,
        isAnimation: Boolean
    },
    computed: {
        isEmpty() {
            const isEmpty =
                this.data === undefined ||
                this.data === null ||
                this.data.length === 0
            console.log(this.data)
            if (!isEmpty) {
                nextTick(() => {
                    generateRelationGraph(
                        this.$refs.graph,
                        this.data,
                        this.link,
                        this.isDraggable,
                        this.isAnimation
                    )
                })
            }
            return isEmpty
        }
    }
}
</script>
