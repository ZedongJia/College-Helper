const MainMenu = [
    {
        name: '个性推荐',
        href: '/#',
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
        name: 'AI问答',
        href: '/system/chatAI',
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
        option: 'menu/toSubMenu',
        icon: 'chat'
    }
]

const SubMenu = [
    {
        name: '个人主页',
        href: '/system/userCenter/homePage',
        icon: 'chat'
    },
    {
        name: '信息修改',
        href: '/system/userCenter/infoBoard',
        icon: 'chat'
    },
    {
        name: '隐私设置',
        href: '/system/userCenter/privacyBoard',
        icon: 'chat'
    },
    {
        name: '查看历史记录',
        href: '/system/userCenter/historyBoard',
        icon: 'chat'
    },
    {
        name: '查看收藏',
        href: '/system/userCenter/collectBoard',
        icon: 'chat'
    },
    {
        name: '私信',
        href: '/system/userCenter/contactBoard',
        icon: 'chat'
    },
    {
        name: '返回',
        href: '/system',
        option: 'menu/toMainMenu',
        icon: 'chat'
    }
]

export default {
    namespaced: true,
    state: {
        menuList: MainMenu,
        state: 'main',
        showMenu: true
    },
    mutations: {
        toSubMenu (state) {
            state.menuList = SubMenu
            state.state = 'sub'
        },
        toMainMenu (state) {
            state.menuList = MainMenu
            state.state = 'main'
        },
        checkState (state) {
            if (window.location.href.includes('userCenter')) {
                this.commit('menu/toSubMenu')
            } else {
                this.commit('menu/toMainMenu')
            }
        },
        switchMenu (state) {
            state.showMenu = !state.showMenu
        }
    }
}
