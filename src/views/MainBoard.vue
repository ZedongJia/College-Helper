<template lang="">
    <NavBar
        id="nav-bar"
        @hide="hideMenu"
    ></NavBar>
    <div id="main">
        <Menu
            :data="menuData"
        ></Menu>
        <div id="view">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            showMenu: true,
            menuData: [
                {
                    name: '实体识别',
                    href: 'identification',
                    icon: 'search'
                },
                {
                    name: '实体查询',
                    href: 'entitySearch',
                    icon: 'entity'
                },
                {
                    name: '关系查询',
                    href: 'relationSearch',
                    icon: 'relation'
                },
                {
                    name: '农业知识概览',
                    href: 'relationSearch',
                    icon: 'graph'
                },
                {
                    name: '农知问答',
                    href: 'relationSearch',
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
#nav-bar {
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
#main {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
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
