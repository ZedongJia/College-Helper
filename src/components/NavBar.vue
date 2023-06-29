<template>
    <div style="position: relative">
        <div>
            <span>hideButton</span>
            <span id="logo">logo</span>
        </div>
        <div>
            <ThemeButton
                id="theme-switch"
                @click="changeTheme"
            ></ThemeButton>
            <span id="log-menu">
                login
                <span id="popover">
                    <Card
                        v-for="item in popoverData"
                        :key="item.name"
                        @click="handlePopoverClick(item)"
                        Static
                    >
                        {{ item.name }}
                    </Card>
                </span>
            </span>
        </div>
    </div>
</template>
<script>
import Theme from '@/assets/theme'
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
            switch (item.name) {
                case '登出':
                    // todo
                    this.$router.push('/login')
                    break
                case '关于':
                    break
            }
        },
        changeTheme(isLight) {
            let newTheme
            if (isLight) {
                newTheme = Theme.light
            } else {
                newTheme = Theme.dark
            }
            const root = document.querySelector(':root')
            for (const k in newTheme) {
                root.style.setProperty(k, newTheme[k])
            }
        }
    }
}
</script>
<style>
#logo {
    margin-left: 20px;
}

#theme-switch {
    position: relative;
    display: inline-block;
    cursor: pointer;
}

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
#popover > * {
    cursor: pointer;
    height: 32px;
    line-height: 32px;
    font-weight: bold;
}
#log-menu:hover > #popover {
    display: inline-block;
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
