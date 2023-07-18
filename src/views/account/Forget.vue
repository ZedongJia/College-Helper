<template lang="">
    <InfoForm
        v-if="isRegister"
        :title="title"
        :warning="warning"
        :inputs="registerLayout.inputs"
        :buttons="registerLayout.buttons"
        @receive="r"
        Popover
    ></InfoForm>
</template>
<script>
export default {}
</script>
<style lang=""></style>
