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
        <PromptBox
            :title="prompt"
            noConfirm
            :isShow="isShow"
        ></PromptBox>
    </div>
</template>
<script>
import { logOutGET } from '@/api/user'
import Theme from '@/assets/theme'
export default {
    name: 'NavBar',
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
            isLight: true,
            prompt: '',
            isShow: false
        }
    },
    methods: {
        handlePopoverClick(item) {
            // todo
            switch (item.name) {
                case '登出':
                    // turn style to light
                    this.isLight = true
                    // todo
                    logOutGET()
                        .then((response) => {
                            console.log(response)
                            if (response.data - 200 === 0) {
                                this.generatePrompt('登出成功')
                                setTimeout(() => {
                                    this.$router.push('/login')
                                }, 1500)
                            } else {
                                this.generatePrompt('登出失败，请重试')
                            }
                        })
                        .catch(() => {
                            this.generatePrompt('网络故障，请重试')
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
        },
        generatePrompt(msg) {
            this.prompt = msg
            this.isShow = true
            setTimeout(() => {
                this.isShow = false
                this.prompt = ''
            }, 1250)
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
