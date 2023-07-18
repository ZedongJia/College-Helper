<template>
    <div class="input">
        <input
            class="input-blank"
            :type="type"
            :value="modelValue"
            @input="handleInput"
            required
        />
        <span class="input-label">{{ title }}</span>
        <span class="fill"></span>
    </div>
</template>

<script>
export default {
    name: 'Input',
    props: {
        type: String,
        modelValue: String,
        title: String
    },
    methods: {
        handleInput(e) {
            this.$emit('update:modelValue', e.target.value)
        }
    }
}
</script>
<style>
.input {
    z-index: 100;
    position: relative;
    width: 100%;
}
.input-blank {
    padding: 0 1em;
    width: 100%;
    height: 48px;
    line-height: 48px;
    color: var(--item-font-color);
}

.input-label {
    pointer-events: none;
    position: absolute;
    left: 0;
    bottom: 0;
    padding-left: 1em;
    height: 48px;
    line-height: 48px;
    color: grey;
    transition: all ease 0.5s;
}

.fill {
    pointer-events: none;
    z-index: -100;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    width: 100%;
    height: 2px;
    background: var(--item-bg-color);
    border-radius: 5px;
    transition: 0.5s;
}

.input-blank:focus ~ .input-label,
.input-blank:valid ~ .input-label {
    color: var(--item-bg-color);
    font-weight: 500;
    padding-left: 0;
    transform: translate(0, -36px);
}

.input-blank:focus ~ .fill,
.input-blank:valid ~ .fill {
    height: 48px;
    border-radius: 5px;
}
</style>
