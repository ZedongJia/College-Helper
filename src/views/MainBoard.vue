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
                    href: 'identification'
                },
                {
                    name: '实体查询',
                    href: 'entitySearch'
                },
                {
                    name: '关系查询',
                    href: 'relationSearch'
                },
                {
                    name: '农业知识概览',
                    href: 'relationSearch'
                },
                {
                    name: '农知问答',
                    href: 'relationSearch'
                }
            ]
        }
    },
    methods: {
        hideMenu() {
            // hide menu
            this.showMenu = !this.showMenu
            const menu = document.querySelector('#menu')
            const view = document.querySelector('#view')
            if (this.showMenu) {
                setTimeout(() => {
                    menu.style.flex = '0 0 15%'
                    view.style.flex = '0 0 85%'
                }, 100)
            } else {
                menu.style.flex = '0 0 4%'
                view.style.flex = '0 0 96%'
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
