<template>
    <InfoForm
        title="hhhhhhhhh"
        :inputs="inputs"
        :buttons="buttons"
        @receive="r"
    ></InfoForm>
</template>
<script>
export default {
    data() {
        return {
            inputs: [
                {
                    type: 'text',
                    symbol: 'Account'
                },
                {
                    type: 'password',
                    symbol: 'Password'
                }
            ],
            buttons: ['register', 'login']
        }
    },
    methods: {
        r(msg) {
            console.log(msg)
        }
    }
}
</script>
<style></style>
