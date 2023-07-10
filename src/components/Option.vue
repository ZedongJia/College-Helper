<template>
    <ul class="select" @mouseleave="closeOptions">
        <Card class="selected" @click="handleOptions">
            {{ selected }} |
        </Card>
        <li ref="option" class="option">
            <Card
                v-for="item in data"
                :key="item"
                @click="handleOptionClick(item)"
                Static
            >
                {{ item }}
            </Card>
        </li>
    </ul>
</template>
<script>
export default {
    name: 'Option',
    props: {
        data: Array,
        default: String
    },
    data() {
        return {
            selected: 'default',
            open: false
        }
    },
    methods: {
        handleOptions() {
            this.open = !this.open
            if (this.open) {
                this.$refs.option.style.display = 'block'
            } else {
                this.$refs.option.style.display = 'none'
            }
        },
        handleOptionClick(item) {
            this.selected = item
            this.handleOptions()
            this.$emit('choice', this.selected)
        },
        closeOptions() {
            if (this.open) {
                this.handleOptions()
            }
        }
    },
    created() {
        this.selected = this.default
    }
}
</script>
<style>
.select {
    cursor: pointer;
    position: relative;
    display: inline-block;
    width: 100px;
    height: 48px;
    text-align: center;
}
.selected {
    width: 100%;
    height: 48px;
    line-height: 48px;
    border-radius: 4px;
}
.option {
    z-index: 100;
    position: absolute;
    left: 50%;
    top: 100%;
    transform: translate(-50%, 0);
    display: none;
    width: 100%;
    height: 48px;
    animation: slide-from-top 0.25s linear forwards;
}
.option > * {
    cursor: pointer;
    height: 32px;
    line-height: 32px;
}

@keyframes slide-from-top {
    0% {
        opacity: 0;
        transform: translate(-50%, -100%);
    }
    80% {
        opacity: 0.2;
    }
    100% {
        opacity: 1;
        transform: translate(-50%, 0);
    }
}
</style>
