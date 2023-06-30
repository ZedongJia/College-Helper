<template lang="">
    <div class="wrapper">
        <Board>输入文本：</Board>
        <Board class="zero">
            <textarea
                    class="textareaItem"
                    style="margin-top: 20px;"
                    name="description"
                    rows="10"
                    cols="100"
                    placeholder="Enter text"
                    v-model="textInput"
                ></textarea>
            <button
                class="searchButton"
            >
                提交!
            </button>
        </Board>

        <Board
            @click="firstexpand"
            class="sizeone"
        >
            [查看识别结果]
        </Board>
        <transition name="fade">
            <Board
                v-if="showfirstBox"
                class="one"
            >
                {{ recognizeResult }}
            </Board>
        </transition>

        <Board
            @click="secondexpand"
            class="sizetwo"
        >
            [查看分词结果]
        </Board>
        <transition name="fade">
            <Board
                v-if="showsecondBox"
                class="two"
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

.zero {
    height: 350px;
    position: relative;
}

.sizeone,
.sizetwo {
    cursor: pointer;
}

.sizeone {
    margin-top: 20px;
}

.sizetwo {
    margin-top: 20px;
}

.one {
    padding: 10px;
    background-color: var(--bg-color);
    box-shadow: 0px 1px 5px var(--item-bg-color);
    height: 100px;
}

.two {
    padding: 10px;
    background-color: var(--bg-color);
    box-shadow: 0px 1px 5px var(--item-bg-color);
    height: 100px;
}

</style>
