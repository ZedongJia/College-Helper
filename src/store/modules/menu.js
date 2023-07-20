const MainMenu = [
    {
        name: '个性推荐',
        href: '/#',
        icon: 'telescope-outline'
    },
    {
        name: '实体识别',
        href: '/system/identification',
        icon: 'search-outline'
    },
    {
        name: '实体查询',
        href: '/system/entitySearch',
        icon: 'search-outline'
    },
    {
        name: '关系查询',
        href: '/system/relationSearch',
        icon: 'search-outline'
    },
    {
        name: '农业知识概览',
        href: '/system/overview',
        icon: 'podium-outline'
    },
    {
        name: '农知问答',
        href: '/system/agriculturalQA',
        icon: 'chatbox-ellipses-outline'
    },
    {
        name: 'AI问答',
        href: '/system/chatAI',
        icon: 'chatbubbles-outline'
    },
    {
        name: '图谱演变',
        href: '/#',
        icon: 'bar-chart-outline'
    },
    {
        name: '用户中心',
        href: '/system/userCenter',
        option: 'menu/toSubMenu',
        icon: 'person-outline'
    }
]

const SubMenu = [
    {
        name: '个人主页',
        href: '/system/userCenter/homePage',
        icon: 'home-outline'
    },
    {
        name: '信息修改',
        href: '/system/userCenter/infoBoard',
        icon: 'reader-outline'
    },
    {
        name: '隐私设置',
        href: '/system/userCenter/privacyBoard',
        icon: 'finger-print-outline'
    },
    {
        name: '查看历史记录',
        href: '/system/userCenter/historyBoard',
        icon: 'recording-outline'
    },
    {
        name: '查看收藏',
        href: '/system/userCenter/collectBoard',
        icon: 'star-outline'
    },
    {
        name: '私信',
        href: '/system/userCenter/contactBoard',
        icon: 'mail-unread-outline'
    },
    {
        name: '返回',
        href: '/system',
        option: 'menu/toMainMenu',
        icon: 'return-down-back-outline'
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
