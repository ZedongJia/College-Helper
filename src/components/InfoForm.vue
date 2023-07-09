<template>
    <div class="frame fade-in">
        <h1 class="input-title">{{ title }}</h1>
        <div
            class="input-box"
            v-for="input in inputs"
            :key="input"
        >
            <Input
                style="width: 80%;"
                :title="input.symbol"
                :type="input.type"
                v-model="inputsF[input.symbol]"
            ></Input>
        </div>
        <div class="button-box">
            <Button
                v-for="button in buttons"
                :key="button"
                @click="handleClick"
            >
                {{ button }}
            </Button>
        </div>
    </div>
</template>
<script>
export default {
    /**
     * inputs: [
     *  {
     *  type: 'text',
     *  symbol: 'account'
     * }
     * ]
     * buttons: [
     *  'register',
     *  'login'
     * ]
     */
    props: {
        title: String,
        inputs: {
            type: Array,
            default: () => []
        },
        buttons: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            inputsF: {}
        }
    },
    methods: {
        handleClick(e) {
            const name = e.target.innerHTML
            this.$emit('receive', {
                name: name,
                inputsF: this.inputsF
            })
            e.stopPropagation()
        }
    },
    created() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputsF[this.inputs[i].symbol] = ''
        }
    }
}
</script>
<style>
.frame {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    background-color: transparent;
    backdrop-filter: blur(20px);
    box-shadow: 0 1px 5px black;
    border-radius: 5px;
}
.frame > * {
    flex: 0 0 100%;
}
/* title */
.input-title {
    margin: 32px 0;
    font-size: 26px;
    text-align: center;
}

.input-box {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
}

/* button css */
.button-box {
    margin: 32px 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
}
</style>
