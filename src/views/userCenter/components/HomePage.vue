<template lang="">
    <Board
        class="flex-row-center info"
        style="padding: 10px"
        inset
    >
        <div class="flex-column-evenly simple-info">
            <div class="avatar"></div>
            <h2>{{ userInfo.nickName }}</h2>
        </div>
        <ul class="content">
            <EmptyHint v-if="isEmpty"></EmptyHint>
            <li
                v-else
                class="flex-row-evenly"
                v-for="msg in userInfo.publicMsg"
                :key="msg.title"
            >
                <span style="font-weight: bold">{{ msg.title }}</span>
                <span>{{ msg.value }}</span>
                <i class="hover-fill"></i>
            </li>
        </ul>
    </Board>
</template>
<script>
export default {
    data() {
        return {
            userInfo: {
                nickName: 'zhngsan',
                publicMsg: []
            }
        }
    },
    computed: {
        isEmpty() {
            return this.userInfo.publicMsg.length === 0
        }
    },
    created() {
        // request, filter, get public
        this.userInfo.publicMsg = [
            {
                title: '邮箱地址',
                value: '224@qq.com'
            },
            {
                title: 'QQ',
                value: '21145712'
            },
            {
                title: '微信',
                value: '145745874'
            }
        ]
    }
}
</script>
<style>
.info {
    width: 100%;
    height: 300px;
    transition: 0.5s;
}

.info:hover {
    height: 400px;
}

.simple-info {
    height: 200px;
    transition: 0.5s;
}

.avatar {
    width: 128px;
    height: 128px;
    border-radius: 64px;
    background-color: black;
}

.content {
    padding-left: 64px;
    width: 0;
    opacity: 0;
    transform: scale(0);
    transition: all 0.5s;
}

.info:hover .content {
    opacity: 1;
    width: 60%;
    transform: scale(1);
}

.content li {
    position: relative;
    margin-bottom: 1em;
}

.content span {
    cursor: default;
    font-size: 18px;
    height: 48px;
    line-height: 48px;
    color: var(--item-bg-color);
    transition: 0.25s;
}

.content li:hover span {
    color: var(--item-font-color);
}

.content .hover-fill {
    pointer-events: none;
    z-index: -100;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    width: 100%;
    height: 2px;
    background: var(--item-bg-color);
    border-radius: 5px;
    transition: 0.5s;
}

.content li:hover .hover-fill {
    height: 48px;
    border-radius: 5px;
}
</style>
