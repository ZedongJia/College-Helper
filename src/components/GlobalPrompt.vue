<template lang="">
    <PromptBox
        :title="prompt"
        noConfirm
        :isShow="isShow"
    ></PromptBox>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState({
            isShow: state => state.prompt.isShow,
            prompt: state => state.prompt.msg
        })
    }
}
</script>
<style lang=""></style>
