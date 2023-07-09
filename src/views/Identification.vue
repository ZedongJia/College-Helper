<template lang="">
    <div class="wrapper fade-in">
        <Board>
            <Title title="输入文本："></Title>
        </Board>
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
                @click="performSearch"
            >
                提交!
            </button>
        </Board>
        <br />
        <Board @click="firstexpand">
            <Title
                style="cursor: pointer"
                title="[查看识别结果]"
            ></Title>
        </Board>
        <AnswerBoard
            :isShow="showfirstBox"
            :isLoading="isLoading"
            extend
        >
            <template #extend>
                <LinkText
                    :text="recognizeResult"
                    :entity="entity"
                >
                </LinkText>
            </template>
        </AnswerBoard>
        <br />
        <Board @click="secondexpand">
            <Title
                style="cursor: pointer"
                title="[查看分词结果]"
            ></Title>
        </Board>
        <AnswerBoard
            :isShow="showsecondBox"
            :isLoading="isLoading"
            :data="segmentationResult"
        ></AnswerBoard>
    </div>
</template>

<script>
import { loading } from '@/utils/loadingCallback'

export default {
    data() {
        return {
            showfirstBox: false,
            showsecondBox: false,
            textInput: '',
            recognizeResult: '玉米，小麦, 袁隆平, 垂直农业, 顶顶顶顶顶顶顶',
            entity: ['玉米', '袁隆平', '垂直农业'],
            segmentationResult: '无结果',
            isLoading: false
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
        },
        performSearch() {
            // todo
            // 判断问题不为空
            // 像后端发送数据
            this.isLoading = true

            // waiting for data
            loading(() => {
                this.isLoading = false
                this.recognizeResult = ''
                this.segmentationResult = ''
            })
        }
    }
}
</script>
<style></style>
