<template>
    <div class="wrapper fade-in">
        <Board>
            <Title title="输入文本："></Title>
        </Board>
        <Board class="flex-column-center">
            <textarea
                class="textareaItem"
                style="margin-top: 20px"
                name="description"
                rows="10"
                placeholder="Enter text"
                v-model="textInput"
            ></textarea>
            <Button
                style="margin: 20px 0; width: 20%"
                @clickIt="performSearch"
            >
                提交!
            </Button>
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
        >
        </AnswerBoard>
    </div>
</template>

<script>
import { loading } from '@/utils/callback'
import { cutSentence } from '@/api/entity'
export default {
    data() {
        return {
            showfirstBox: false,
            showsecondBox: false,
            textInput: '',
            recognizeResult: '',
            entity: {},
            segmentationResult: '',
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
            if (this.textInput === '') {
                this.$store.commit('prompt/trigger', {
                    msg: '文本不能为空哦',
                    level: 'attention'
                })
                return
            }
            // 像后端发送数据
            this.isLoading = true
            if (!this.showfirstBox) {
                this.showfirstBox = true
            }
            if (!this.showsecondBox) {
                this.showsecondBox = true
            }
            // waiting for data
            loading(() => {
                cutSentence({
                    sentence: this.textInput
                })
                    .then((result) => {
                        console.log(result)
                        this.recognizeResult = this.textInput
                        this.entity = result.cut_dict
                        this.segmentationResult = result.cut_list
                        this.isLoading = false
                    })
                    .catch((error) => {
                        this.$store.commit('prompt/trigger', {
                            msg: error,
                            level: 'warning'
                        })
                        if (this.showfirstBox) {
                            this.showfirstBox = true
                        }
                        if (this.showsecondBox) {
                            this.showsecondBox = true
                        }
                    })
            })
        }
    }
}
</script>
<style></style>
