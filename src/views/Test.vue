<template>
    <div class="group"><Cardgroup :pages="someList"></Cardgroup></div>
</template>
<script>
export default {
    data() {
        return {
            someList: [],
            stackinit: {
                visible: 3
            }
        }
    },
    mounted() {
        const that = this
        that.someList = [
            {
                title: '原神',
                content:
                    '中国孩子使用草神开e直接制造了植物抢夺了氧气让火熄灭,这件事告诉我们从小培养孩子玩原神比什么都重要',
                link: '#'
            },
            {
                title: '柯洁',
                content:
                    '柯洁局势不妙→柯洁昏招频出→柯洁陷入苦战→柯洁进退维谷→柯洁垂死挣扎→柯洁全盘崩溃→柯洁败局已定→柯洁发表获胜感言',
                link: '#'
            },
            {
                title: 'ww',
                content:
                    '在ww的流水里面挖呀挖呀挖,有ktv的舌吻和遍地随处拉.在ww的猪脸上面挖呀挖呀挖,有熏黄的牙齿和烂脸的疤。在ww的杂志里面挖呀挖呀挖,有消失的训练赛和上不了的首发～',
                link: '#'
            },
            {
                title: '阿水',
                content:
                    '求求各位了，别黑文波了，他真的很努力。求求各位了，别黑文波了，他真的很努力。求求各位了，别黑文波了，他真的很努力。求求各位了，别黑文波了，他真的很努力。求求各位了，别黑文波了，他真的很努力。',
                link: '#'
            },
            {
                title: '喻文波',
                content:
                    '姐妹劝删,喻文波是写给全人类的情书,他是爱是希望是人类的勇气,他是来自未来的史诗,他是浪漫本身。虽然萝卜青菜各有所爱,但不爱请尊重,他是我们i文的信仰',
                link: '#'
            },
            {
                title: 'Jackeylove',
                content:
                    '你在搜jackeylove❓还是喻文波❓还是冰冰 ❓还是TES48二期生❓你只需要知道他是LPL冠军顶级ad全能ACE可盐可甜的大top🤛是队伍的绝对核心✅对线的小魔王❗jackeylove💞一骑绝尘杰克爱全LPL断层大TOP jackeylove唯一天选杰克爱💞甜甜糯糯小波波',
                link: '#'
            }
        ]
    }
}
</script>
<style>
.group {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
}
</style>
