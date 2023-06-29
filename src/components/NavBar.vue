<template>
    <div>
        <div>
            <span>hideButton</span>
            <span id="logo">logo</span>
        </div>
        <div>
            <span>themeSw</span>
            <span id="log-menu">
                login
                <span id="popover">
                    <Card v-for="item in popoverData" :key="item.name" @onclick="handlePopoverClick(item)" Static>
                        {{ item.name }}
                    </Card>
                </span>
            </span>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            popoverData: [
                {
                    name: '登出',
                    choice: 'ss'
                },
                {
                    name: '关于',
                    choice: 'ss'
                }
            ]
        }
    },
    methods: {
        handlePopoverClick(item) {
            // todo
        }
    }
}
</script>
<style>
#log-menu {
    cursor: pointer;
    position: relative;
    display: inline-block;
    margin: 0 20px;
    width: 100px;
    text-align: center;
}
#popover {
    position: absolute;
    left: 50%;
    top: 64px;
    transform: translate(-50%, 0);
    width: 100px;
    display: none;
    animation: slide-from-top 0.25s linear forwards;
}
#popover> * {
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    font-weight: bold;
}
#log-menu:hover> #popover {
    display: inline-block;
}
@keyframes slide-from-top {
    0%{
        opacity: 0;
        transform: translate(-50%, -100%);
    }
    80%{
        opacity: 0.2;
    }
    100%{
        opacity: 1;
        transform: translate(-50%, 0);
    }
}
</style>
