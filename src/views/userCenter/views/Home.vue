<template>
    <HomePage :id="id"></HomePage>
</template>
<script>
import HomePage from '@/components/HomePage.vue'
import { mapState } from 'vuex'
export default {
    components: {
        HomePage
    },
    computed: {
        ...mapState({
            id: (state) => state.userInfo.id
        })
    }
}
</script>
