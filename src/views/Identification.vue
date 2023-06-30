<template lang="">
    <div class="wrapper">
        <Board>输入文本：</Board>
        <Board class="identity">
            <textarea
                class="textareaItem"
                style="margin-top: 20px"
                name="description"
                rows="10"
                cols="100"
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
                {{ recognizeResult }}
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
            recognizeResult: '无结果',
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
.identity {
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
}

.searchresult {
    padding: 10px;
    background-color: var(--bg-color);
    box-shadow: 0px 1px 5px var(--item-bg-color);
    height: 100px;
}
</style>
