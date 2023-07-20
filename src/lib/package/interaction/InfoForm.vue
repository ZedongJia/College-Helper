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
                <span class="form-title">{{ input.title }}</span>
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
            </form>
            <div
                class="flex-row-left file-box"
                v-else-if="input.type === 'file'"
            >
                <span class="file-label">{{ input.title }}</span>
                <input
                    :id="input.symbol"
                    :type="input.type"
                    :accept="input.accept"
                />
            </div>
            <div
                class="flex-row"
                v-else-if="input.type === 'valid'"
            >
                <Input
                    :title="input.title"
                    type="text"
                    v-model="inputsF[input.symbol]"
                />
                <Button
                    @clickIt="send(this, input.callback)"
                    :disabled="notAllowed"
                    >{{ sendPrompt }}</Button
                >
            </div>
            <Input
                v-else
                :title="input.title"
                :type="input.type"
                v-model="inputsF[input.symbol]"
            />
        </div>
        <div v-if="Popover">
            <p class="warning-text">{{ warning }} <slot></slot></p>
        </div>
        <div class="button-box">
            <Button
                v-for="button in buttons"
                :key="button"
                @click.stop="handleClick(button.symbol)"
            >
                {{ button.title }}
            </Button>
        </div>
        <div class="tip">
            <slot name="tip"></slot>
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
        warning: {
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
            checkBox: [],
            fileBox: [],
            sendPrompt: '点击发送',
            notAllowed: false
        }
    },
    methods: {
        send(e, callback) {
            this.sendPrompt = '已发送'
            this.notAllowed = true
            let count = 60
            const wait = setInterval(() => {
                this.sendPrompt = count
                count -= 1
                if (count === 0) {
                    clearInterval(wait)
                    this.sendPrompt = '点击发送'
                    this.notAllowed = false
                }
            }, 1000)
            callback(this.inputsF.account)
        },
        handleClick(symbol) {
            const name = symbol
            // deal form
            this.decodeForm()
            this.decodeFile()
            this.$emit('receive', {
                name: name,
                inputsF: this.inputsF
            })
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
        },
        decodeFile() {
            const fileNode = this.fileBox.map((e) =>
                document.querySelector('#' + e)
            )
            fileNode.forEach((e, index) => {
                this.inputsF[this.fileBox[index]] = e.files[0]
            })
        },
        loadData() {
            for (let i = 0; i < this.inputs.length; i++) {
            const value =
                this.inputs[i].value === undefined ? '' : this.inputs[i].value
            this.inputsF[this.inputs[i].symbol] = value
            if (this.inputs[i].type === 'checkbox') {
                this.checkBox.push(this.inputs[i].symbol)
            }
            if (this.inputs[i].type === 'file') {
                this.fileBox.push(this.inputs[i].symbol)
            }
        }
        }
    },
    mounted() {
        this.loadData()
    },
    watch: {
        inputs: {
            handler() {
                this.loadData()
            },
            deep: true
        }
    }
}
</script>
<style>
.frame {
    padding: 32px 0;
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
    background-color: white;
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
    margin-top: 32px;
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
    width: 100%;
    height: 64px;
    color: var(--item-bg-color);
    border-bottom: 2px solid var(--item-bg-color);
}

.form-box > * {
    margin: 0 0.5em;
}

.form-box .form-title {
    margin: 0 1em;
    font-weight: bold;
    font-size: 18px;
}

/* 表单样式 */
.file-box {
    width: 100%;
    color: var(--item-bg-color);
}
.file-box .file-label {
    pointer-events: none;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 96px;
    line-height: 48px;
    color: var(--item-bg-color);
    transition: all ease 0.5s;
}

.file-box input[type='file'] {
    font-weight: bold;
}

.file-box input[type='file']::file-selector-button {
    cursor: pointer;
    overflow: hidden;
    text-align: center;
    min-width: 120px;
    margin-right: 2em;
    height: 48px;
    line-height: 48px;
    font-weight: bold;
    transition: 0.4s;
    color: var(--item-font-color);
    background-color: var(--item-bg-color);
    border-radius: 5px;
    border: none;
}

.file-box input[type='file']::file-selector-button:hover {
    color: var(--item-font-rev-color);
    background-color: var(--item-bg-rev-color);
}

/* button css */
.button-box {
    margin-top: 32px;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
}

.tip {
    margin: 5px 0;
    text-align: center;
}

.warning-text {
    margin: 0 auto;
    width: 80%;
    font-size: 18px;
    font-weight: bold;
    color: red;
}
</style>
