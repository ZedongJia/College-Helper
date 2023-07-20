<template>
    <TransitionGroup
        id="menu"
        tag="div"
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
    >
        <MenuItem
            v-for="(item, index) in data"
            :key="item.name"
            @click="turnTo(item)"
            :data-index="index"
            Dynamic
        >
            <div class="flex-row">
                <div class="icon">
                    <ion-icon :name="item.icon"></ion-icon>
                </div>
                <p>{{ item.name }}</p>
            </div>
        </MenuItem>
    </TransitionGroup>
</template>
<script>
import gsap from 'gsap'
import { nextTick } from 'vue'
import { mapState } from 'vuex'
export default {
    props: {
        data: Array
    },
    computed: {
        ...mapState({
            showMenu: (state) => state.menu.showMenu
        })
    },
    methods: {
        turnTo(item) {
            if (item.option !== undefined) {
                this.$store.commit(item.option)
            }
            this.$router.push({
                path: item.href
            })
        },
        onBeforeEnter(el) {
            el.style.opacity = 0
            el.style.height = 0
        },
        onEnter(el, done) {
            gsap.to(el, {
                opacity: 1,
                height: '48px',
                delay: el.dataset.index * 0.05,
                onComplete: done
            })
        },
        onLeave(el, done) {
            gsap.to(el, {
                opacity: 0,
                height: 0,
                delay: 0,
                onComplete: done
            })
        },
        hideOrshow() {
            const menu = document.querySelector('#menu')
            const ps = menu.querySelectorAll('p')
            const view = document.querySelector('#view')
            if (this.showMenu) {
                menu.style.flex = '0 0 15%'
                view.style.flex = '0 0 85%'
                for (let i = 0; i < ps.length; i++) {
                    ps[i].style.visibility = 'visible'
                }
            } else {
                menu.style.flex = '0 0 6%'
                view.style.flex = '0 0 94%'
                for (let i = 0; i < ps.length; i++) {
                    ps[i].style.visibility = 'hidden'
                }
            }
        }
    },
    mounted() {
        this.$store.commit('menu/checkState')
    },
    watch: {
        showMenu() {
            // 判断菜单栏加载
            this.hideOrshow()
        },
        data: {
            handler() {
                nextTick(() => {
                    this.hideOrshow()
                })
            },
            deep: true
        }
    }
}
</script>
<style>
#menu > * {
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 5px;
    width: 90%;
    height: 48px;
    line-height: 48px;
    font-weight: bold;
    border-radius: 50px;
    overflow: hidden;
}
#menu .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 48px;
    height: 32px;
}

</style>
