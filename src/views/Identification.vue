<template lang="">
    <div
        class="wrapper"
    >
        <Board>输入文本：</Board>
        <Board class="flex-column">
            <textarea
                class="textareaItem"
                style="margin-top: 20px"
                name="description"
                rows="10"
                placeholder="Enter text"
                v-model="textInput"
            ></textarea>
            <button
                class="searchButton"
                style="margin: 20px 0; width: 50%"
            >
                提交!
            </button>
        </Board>

        <Board
            @click="firstexpand"
            style="margin-top: 20px; cursor: pointer"
        >
            [查看识别结果]
        </Board>
        <transition name="fade">
            <Board
                v-if="showfirstBox"
                class="searchresult"
            >
                <LinkText
                    :text="recognizeResult"
                    :entity="entity"
                ></LinkText>
            </Board>
        </transition>
        <Board
            @click="secondexpand"
            style="margin-top: 20px; cursor: pointer"
        >
            [查看分词结果]
        </Board>
        <transition name="fade">
            <Board
                v-if="showsecondBox"
                class="searchresult"
            >
                {{ segmentationResult }}
            </Board>
        </transition>
    </div>
</template>

<script>
import './style/index.css'
export default {
    data() {
        return {
            showfirstBox: false,
            showsecondBox: false,
            textInput: '',
            recognizeResult: '玉米，小麦, 袁隆平, 垂直农业, 顶顶顶顶顶顶顶',
            entity: ['玉米', '袁隆平', '垂直农业'],
            segmentationResult: '无结果'
        }
    },
    methods: {
        firstexpand() {
            // ...
            this.showfirstBox = !this.showfirstBox
        },
        secondexpand() {
            // ...
            this.showsecondBox = !this.showsecondBox
        }
    }
}
</script>
<style>
.searchresult {
    padding: 10px;
    background-color: var(--bg-color);
    box-shadow: 0px 1px 5px var(--item-bg-color);
    min-height: 100px;
}
</style>
