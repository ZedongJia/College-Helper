<template lang="">
    <div class="wrapper">
        <Board>输入文本：</Board>
        <Board class="zero">
            <Board class="zerotext">
                <textarea
                    name="description"
                    rows="10"
                    cols="100"
                    placeholder="Enter text"
                    v-model="textInput"
                ></textarea>
            </Board>
            <button class="zerobutton">提交!</button>
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
.wrapper {
    width: 80%;
    margin: auto;
}

.zerotext {
    margin: auto;
    width: 85%;
    margin-top: 20px;
}

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

textarea {
    width: 100%;
    resize: none;
    background-color: var(--bg-color);
    color: var(--font-color);
    border: none;
}

.zerobutton {
    cursor: pointer;
    position: absolute;
    top: 87%;
    left: 50%;
    transform: translate(-50%, -87%);
    background-color: var(--item-bg-color);
    border-radius: 4px;
    font-weight: bold;
    color: var(--item-font-color);
    padding: 12px 80px;
    text-align: center;
    text-decoration: none;
    font-size: 15px;
    transition: 0.25s;
}
.zerobutton:hover {
    background-color: var(--item-bg-rev-color);
    color: var(--item-font-rev-color);
}
</style>
