<template>
    <component
        :is="getComponent"
        :name="name"
        :label="label"
    ></component>
</template>
<script>
import './style/detail.css'
import Lemma from './component/Lemma.vue'
import University from './component/University.vue'
import Major from './component/Major.vue'
export default {
    props: {
        name: String,
        label: String
    },
    computed: {
        getComponent() {
            switch (this.label) {
                case 'person':
                case 'mainBranch':
                case 'subBranch':
                case 'special':
                    return 'lemma'
                default:
                    return this.label
            }
        }
    },
    components: {
        lemma: Lemma,
        university: University,
        major: Major
    }
}
</script>
