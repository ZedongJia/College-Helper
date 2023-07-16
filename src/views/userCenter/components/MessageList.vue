<template lang="">
    <transition-group
        tag="ul"
        name="list"
        class="list"
    >
        <span
            class="group"
            v-for="group in Object.keys(messageDict)"
            :key="group"
        >
            <Title
                :title="group"
                style="border-bottom: 1px solid var(--item-bg-color)"
            ></Title>
            <br />
            <li
                class="flex-row"
                v-for="(item, index) in Object.values(messageDict[group])"
                :key="item"
                @click="turnTo(group, index)"
            >
                <span>{{ item.time }}</span>
                <span>{{ item.type }}</span>
                <span>{{ item.content }}</span>
                <Button @clickIt="del(group, index)">Delete<i>!</i></Button>
                <i class="hover-fill"></i>
            </li>
        </span>
    </transition-group>
</template>
<script>
export default {
    props: {
        messageDict: Object
    },
    methods: {
        turnTo(group, index) {
            const { type, content } = this.messageDict[group][index]
            let page = ''
            switch (type) {
                case '实体识别':
                    page = 'identification'
                    break
                case '关系查询':
                    page = 'relationSearch'
                    break
                case '实体查询':
                    page = 'entitySearch'
                    break
            }
            this.$router.push({
                path: page,
                meta: {
                    content: content
                }
            })
        },
        del(group, index) {
            // todo
        }
    }
}
</script>
<style>
.list .group {
    display: block;
    margin-bottom: 1em;
}

.list li {
    z-index: 1;
    position: relative;
}
.list li > span {
    flex: 0 0 55%;
    padding: 0 1em;
    height: 48px;
    line-height: 48px;
    overflow: hidden;
    transition: 0.25s;
}

.list li:hover span,
.list li:hover .btn {
    cursor: pointer;
    color: var(--item-font-color);
}

.list li > span:nth-child(1) {
    flex: 0 0 20%;
}
.list li > span:nth-child(2) {
    flex: 0 0 15%;
}

.list li .hover-fill {
    z-index: -100;
    pointer-events: none;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate(-50%, 0);
    width: 100%;
    height: 0px;
    background: var(--item-bg-color);
    border-radius: 5px;
    transition: 0.5s;
}

.list li:hover .hover-fill {
    height: 48px;
    border-radius: 5px;
}

.list .btn {
    position: relative;
    flex: 0 0 10%;
    min-width: 0;
    color: var(--font-color);
    background-color: transparent;
}
</style>
