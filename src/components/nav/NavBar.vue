<template>
    <div id="nav-bar">
        <div style="display: flex; flex: row nowrap">
            <HideButton
                style="margin-top: 16px"
                @click="emitHideMeg"
            ></HideButton>
            <span id="logo">垂直农业知识图谱</span>
        </div>
        <div class="flex-row-center">
            <ThemeCheck
                id="theme-switch"
                v-model="isLight"
            ></ThemeCheck>
            <span id="log-menu">
                个人中心
                <span id="popover">
                    <MenuItem
                        v-for="item in popoverData"
                        :key="item.name"
                        @click="handlePopoverClick(item)"
                        Static
                    >
                        {{ item.name }}
                    </MenuItem>
                </span>
            </span>
        </div>
    </div>
</template>
<script>
import { stateGET } from '@/api/user'
import Theme from '@/assets/theme'
import HideButton from './components/HideButton.vue'
import ThemeCheck from './components/ThemeCheck.vue'
export default {
    components: {
        HideButton,
        ThemeCheck
    },
    data() {
        return {
            popoverData: [
                {
                    name: '登出'
                },
                {
                    name: '关于'
                }
            ],
            isLight: true
        }
    },
    methods: {
        handlePopoverClick(item) {
            // todo
            switch (item.name) {
                case '登出':
                    // todo
                    stateGET({
                        logout: true
                    })
                        .then(() => {
                            // 清空本地存储
                            this.$store.commit('userInfo/refresh')
                            this.$store.commit('prompt/trigger', '登出成功')
                            setTimeout(() => {
                                // turn style to light
                                this.isLight = true
                                this.$router.push('/')
                            }, 1500)
                        })
                        .catch(() => {
                            this.$store.commit('prompt/trigger', {
                                msg: '登出失败，请重试',
                                level: 'warning'
                            })
                        })
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
        },
        emitHideMeg(e) {
            this.$emit('hide', e)
            e.stopPropagation()
        }
    },
    watch: {
        isLight() {
            this.changeTheme(this.isLight)
        }
    }
}
</script>
<style>
#nav-bar {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-bottom: 20px;
    width: 100%;
    height: 64px;
    line-height: 64px;
    color: var(--font-color);
    font-weight: bold;
    box-shadow: 0 1px 10px var(--item-bg-color);
}

#logo {
    margin-left: 20px;
    font-size: 22px;
    font-weight: bold;
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
    z-index: 100;
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
