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
export default {
    components: {
        NavBar,
        Menu,
        RouteNav
    },
    data() {
        return {
            showMenu: true,
            menuData: [
                {
                    name: '个性推荐',
                    href: '/system/interest',
                    icon: 'chat'
                },
                {
                    name: '实体识别',
                    href: '/system/identification',
                    icon: 'search'
                },
                {
                    name: '实体查询',
                    href: '/system/entitySearch',
                    icon: 'entity'
                },
                {
                    name: '关系查询',
                    href: '/system/relationSearch',
                    icon: 'relation'
                },
                {
                    name: '农业知识概览',
                    href: '/system/overview',
                    icon: 'graph'
                },
                {
                    name: '农知问答',
                    href: '/system/agriculturalQA',
                    icon: 'chat'
                },
                {
                    name: '图谱演变',
                    href: '/#',
                    icon: 'chat'
                },
                {
                    name: '用户中心',
                    href: '/system/userCenter',
                    icon: 'chat'
                }
            ]
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
    padding: 20px;
    color: var(--font-color);
}
</style>
