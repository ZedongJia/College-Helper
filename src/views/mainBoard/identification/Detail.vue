<template>
    <component :is="componentName"></component>
</template>
<script>
import Lemma from './component/Lemma.vue'
import University from './component/University.vue'
export default {
    props: {
        entity: String,
        label: String
    },
    data() {
        return {
            componentName: 'University'
        }
    },
    components: {
        Lemma,
        University
    }
}
</script>
