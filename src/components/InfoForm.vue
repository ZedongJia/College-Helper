<template>
    <div
        :class="{
            frame: true,
            'fade-in': true,
            popover: Popover
        }"
    >
        <h1
            v-if="title !== ''"
            class="input-title"
        >
            {{ title }}
        </h1>
        <div
            class="input-box"
            v-for="input in inputs"
            :key="input"
        >
            <form
                class="flex-row-left form-box"
                :id="input.symbol"
                v-if="input.options !== undefined"
            >
                <span>{{ input.title }}</span>
                <label
                    class="flex-row-center"
                    v-for="option in input.options"
                    :key="option"
                >
                    <input
                        type="radio"
                        name="check"
                        :checked="inputsF[input.symbol] == option"
                    />
                    {{ option }}
                </label>
                <span class="line"></span>
            </form>
            <Input
                v-else
                :title="input.title"
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
    name: 'InfoForm',
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
        title: {
            type: String,
            default: ''
        },
        Popover: Boolean,
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
            inputsF: {},
            checkBox: []
        }
    },
    methods: {
        handleClick(e) {
            const name = e.target.innerHTML
            // deal form
            this.decodeForm()
            this.$emit('receive', {
                name: name,
                inputsF: this.inputsF
            })
            e.stopPropagation()
        },
        decodeForm() {
            const formNode = this.checkBox.map((e) =>
                document.querySelector('#' + e)
            )
            formNode.forEach((e, index) => {
                const checkboxs = e.querySelectorAll('input')
                for (let i = 0; i < checkboxs.length; i++) {
                    if (e.checked) {
                        this.inputsF[checkboxs[index]] = e.value
                        break
                    }
                }
            })
        }
    },
    created() {
        for (let i = 0; i < this.inputs.length; i++) {
            const value =
                this.inputs[i].value === undefined ? '' : this.inputs[i].value
            this.inputsF[this.inputs[i].symbol] = value
            if (this.inputs[i].type === 'checkbox') {
                this.checkBox.push(this.inputs[i].symbol)
            }
        }
    }
}
</script>
<style>
.frame {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
}
.popover {
    z-index: 200;
    width: 400px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: transparent;
    backdrop-filter: blur(100px);
    border-radius: 12px;
    box-shadow: 7px 7px 10px 3px #24004628;
}

.popover .input-box > * {
    width: 80%;
}

.frame > * {
    flex: 0 0 100%;
}
/* title */
.input-title {
    margin-top: 80px;
    font-size: 26px;
    text-align: center;
}

.input-box {
    margin-top: 32px;
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-items: center;
}

.form-box {
    position: relative;
    width: 100%;
    height: 64px;
    border-bottom: 2px solid var(--item-bg-color);
}

.form-box > * {
    margin: 0 0.5em;
    color: var(--item-bg-color);
}

.form-box span {
    margin: 0 1em;
    font-weight: bold;
    font-size: 18px;
    color: var(--item-bg-color);
}

/* button css */
.button-box {
    margin: 32px 0;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
}
</style>
