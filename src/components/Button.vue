<template>
    <button
        class="btn"
        @click="handleClick"
    >
        <slot></slot>
    </button>
</template>
<script>
export default {
    data() {
        return {
            isClick: false
        }
    },
    methods: {
        handleClick(e) {
            // 防抖, 0.5s一次
            if (!this.isClick) {
                this.$emit('clickIt', e)
                this.isClick = true
                setTimeout(() => {
                    this.isClick = false
                }, 500)
            }
            e.stopPropagation()
        }
    }
}
</script>
<style>
.btn {
    z-index: 1;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-align: center;
    padding: 0 8px;
    min-width: 96px;
    height: 48px;
    line-height: 48px;
    font-weight: bold;
    text-transform: uppercase;
    transition: 0.25s;
    color: var(--item-font-color);
    background-color: var(--item-bg-color);
    border-radius: 5px;
}

.btn::before {
    content: '';
    width: 0;
    height: 500%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(45deg);
    background-color: var(--item-bg-rev-color);
    transition: 0.5s ease;
    display: block;
    z-index: -1;
}

.btn:hover::before {
    width: 300%;
}

.btn:hover {
    color: var(--item-font-rev-color);
}
</style>
