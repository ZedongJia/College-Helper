<template>
    <NavBar
        @hide="hideMenu"
    ></NavBar>
    <div id="main">
        <Menu
            :data="menuData"
        ></Menu>
        <div id="view">
            <RouteNav></RouteNav>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import NavBar from '@/components/nav/NavBar.vue'
import Menu from '@/components/Menu.vue'
import RouteNav from '@/components/RouteNav.vue'
import { mapState } from 'vuex'
export default {
    components: {
        NavBar,
        Menu,
        RouteNav
    },
    computed: {
        ...mapState({
            menuData: state => state.menu.menuList
        })
    },
    data() {
        return {
            showMenu: true
        }
    },
    methods: {
        hideMenu() {
            // hide menu
            this.showMenu = !this.showMenu
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
    }
}
</script>
<style>
#main {
    position: relative;
    padding-bottom: 64px;
    display: flex;
    flex-flow: row nowrap;
    overflow-x: hidden;
}
#main >* {
    transition: 0.5s;
}
#main > :nth-child(1) {
    flex: 0 0 15%;
}
#main > :nth-child(2) {
    flex: 0 0 85%;
    padding: 0 20px 20px 20px;
    color: var(--font-color);
}
</style>
