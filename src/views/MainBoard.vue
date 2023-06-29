<template lang="">
    <NavBar id="nav-bar"></NavBar>
    <div id="main">
        <Menu :data="menuData"></Menu>
        <div>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            menuData: [
                {
                    name: '实体识别',
                    href: '1'
                },
                {
                    name: '实体查询',
                    href: '2'
                },
                {
                    name: '关系查询',
                    href: '3'
                },
                {
                    name: '农业知识概览',
                    href: '4'
                },
                {
                    name: '农知问答',
                    href: '5'
                }
            ]
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
    display: flex;
    flex-flow: row nowrap;
}
#main>:nth-child(1) {
    flex: 0 0 15%;
}
#main>:nth-child(2) {
    flex: 0 0 85%;
    padding: 20px;
    color: var(--font-color);
}
</style>
