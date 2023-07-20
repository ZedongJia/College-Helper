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
            <div style="display: flex; flex-flow: row nowrap">
                <div style="margin-right: 0.5em">
                    <img
                        style="margin-top: 8px; width: 32px"
                        :src="require('../assets/icons/' + item.icon + '.png')"
                        alt="..."
                    />
                </div>
                <p>{{ item.name }}</p>
            </div>
        </MenuItem>
    </TransitionGroup>
</template>
<script>
import gsap from 'gsap'
export default {
    props: {
        data: Array
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
                delay: el.dataset.index * 0.15,
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
        }
    },
    mounted() {
        // 判断菜单栏加载
        this.$store.commit('menu/checkState')
    }
}
</script>
<style>
#menu > * {
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 5px;
    padding-left: 1.5em;
    width: 90%;
    height: 48px;
    line-height: 48px;
    font-weight: bold;
    border-radius: 50px;
    overflow: hidden;
}
</style>
