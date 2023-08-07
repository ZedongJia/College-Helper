<template>
    <br />
    <Loading v-if="isEmpty"></Loading>
    <div
        v-else
        class="wrapper fade-in detail-layout"
    >
        <!-- 左列 -->
        <Board>
            <!-- 第一部分：标题 + 词条 -->
            <!-- 页面标题 -->
            <br />
            <div class="flex-row detail-header">
                <div class="icon" style="width: 64px;">
                    <ion-icon
                        style="transform: scale(1.5)"
                        name="pricetags-outline"
                    ></ion-icon>
                </div>
                <Title style="font-size: 32px"> {{ data.name }} </Title>
            </div>
            <br />
            <div
                class="itemLabel"
                v-for="tag in data.honorTags"
                :key="tag"
            >
                {{ tag }}
            </div>
            <hr class="line" />
            <div class="flex-row detail-title">
                <div class="icon"><ion-icon name="logo-instagram"></ion-icon></div>
                <Title>学校风景</Title>
            </div>
            <div
                class="detail-content"
                style="height: 400px"
            >
                <div
                    class="img-to-left"
                    @click="imgPointer > 0 ? (imgPointer -= 1) : (imgPointer = data.imageUrls.length - 1)"
                >
                    <ion-icon
                        style="transform: scale(2)"
                        name="caret-back-circle"
                    ></ion-icon>
                </div>
                <Transition
                    name="img-fade"
                    mode="out-in"
                >
                    <img
                        :src="imgShow"
                        alt="该条目无图片"
                        class="image"
                        :key="imgShow"
                    />
                </Transition>
                <div
                    class="img-to-right"
                    @click="imgPointer < data.imageUrls.length - 1 ? (imgPointer += 1) : (imgPointer = 0)"
                >
                    <ion-icon
                        style="transform: scale(2)"
                        name="caret-forward-circle"
                    ></ion-icon>
                </div>
            </div>
            <br />
            <div class="flex-row detail-title">
                <div class="icon"><ion-icon name="call-outline"></ion-icon></div>
                <Title>学校信息</Title>
            </div>
            <div
                class="flex-row public-info-list detail-content"
                style="justify-content: left; flex-flow: row wrap"
            >
                <div
                    class="flex-row"
                    v-for="keyItem in Object.keys(universityInfo)"
                    :key="keyItem"
                >
                    <span class="detail-key">{{ keyItem }}:</span>
                    <span
                        class="detail-value"
                        style="font-size: 14px"
                        v-if="Array.isArray(universityInfo[keyItem])"
                    >
                        <span
                            v-for="(item, index) in universityInfo[keyItem]"
                            :key="index"
                        >
                            {{ item }};
                        </span>
                    </span>
                    <span
                        style="font-size: 14px"
                        v-else
                        >{{ universityInfo[keyItem] }}</span
                    >
                </div>
            </div>
            <br />
            <div class="flex-row detail-title">
                <div class="icon"><ion-icon name="pricetag-outline"></ion-icon></div>
                <Title>专业详情</Title>
            </div>
            <MessageList
                style="width: 100%"
                bigIcon="recording-outline"
                :messageDict="data.recommend"
                :headers="['主类别', '子类别', '专业']"
                :colWidth="[15, 20, 65]"
                @query="turnTo"
                nodel
                nocursor
            ></MessageList>
            <br />
            <div class="flex-row detail-title">
                <div class="icon"><ion-icon name="pricetag-outline"></ion-icon></div>
                <Title>学校简介</Title>
            </div>
            <div class="detail-content">
                <p
                    v-for="text in data.intro"
                    :key="text"
                >
                    {{ text }}
                </p>
            </div>
            <hr class="line" />
        </Board>
        <!-- 右列 -->
        <div>
            <Board style="padding: 20px">
                <Title>{{ '专业概览' }}</Title>
                <hr class="line" />
                <RelationGraph
                    fixHeight="200px"
                    :data="data.related"
                    :link="data.link"
                    inset
                    isDraggable
                    isAnimation
                ></RelationGraph>
            </Board>
            <br />
            <Board style="padding: 20px">
                <Title title="基本信息"></Title>
                <hr class="line" />
                <div
                    class="flex-row info-list"
                    style="justify-content: left; flex-flow: row wrap"
                >
                    <div
                        class="flex-row-left"
                        style="width: 100%"
                        v-for="keyItem in Object.keys(data.educationInfo)"
                        :key="keyItem"
                    >
                        <span>{{ keyItem }}</span>
                        <span
                            v-if="typeof data.educationInfo[keyItem] === 'string'"
                            style="font-size: 14px"
                        >
                            {{ data.educationInfo[keyItem] }}个
                        </span>
                        <span
                            v-else
                            style="font-size: 14px"
                            v-for="subKey in Object.keys(data.educationInfo[keyItem])"
                            :key="subKey"
                        >
                            <span>
                                <b>{{ subKey }}:</b>
                            </span>
                            <span> {{ data.educationInfo[keyItem][subKey] }} {{ data.educationInfo[keyItem][subKey] === '--' ? '' : '个' }} </span>
                        </span>
                    </div>
                </div>
            </Board>
            <br />
            <Board style="padding: 20px">
                <Title title="排名信息"></Title>
                <hr class="line" />
                <div
                    class="flex-row info-list"
                    style="justify-content: left; flex-flow: row wrap"
                >
                    <div
                        class="flex-row-left"
                        style="width: 100%"
                        v-for="keyItem in Object.keys(data.rankInfo)"
                        :key="keyItem"
                    >
                        <span>{{ keyItem }}</span>
                        <span>{{ data.rankInfo[keyItem] }}名</span>
                    </div>
                </div>
            </Board>
        </div>
    </div>
</template>
<script>
import { queryEntity } from '@/api/entity'

export default {
    props: {
        name: String,
        label: String
    },
    data() {
        return {
            data: {
                name: '',
                educationInfo: {},
                establishTime: '',
                honorTags: [],
                imageUrls: [],
                intro: [],
                officialEmail: '',
                officialPhoneNumber: [],
                officialWebsite: [],
                rankInfo: []
            },
            imgPointer: 0
        }
    },
    computed: {
        isEmpty() {
            return this.data.name === ''
        },
        universityInfo() {
            return {
                官方电话: this.data.officialPhoneNumber,
                官方网站: this.data.officialWebsite,
                官方邮箱: this.data.officialEmail.split('：')[1]
            }
        },
        imgShow() {
            return this.data.imageUrls[this.imgPointer]
        }
    },
    methods: {
        receiveOption(option) {
            this.option = option
        }
    },
    created() {
        queryEntity({
            name: this.name,
            label: this.label
        })
            .then((data) => {
                console.log(data)
                this.data = data
            })
            .catch((error) => {
                this.$store.commit('prompt/trigger', {
                    msg: error,
                    level: 'warning'
                })
                setTimeout(() => {
                    this.$router.push({
                        name: 'identification'
                    })
                }, 2000)
            })
    }
}
</script>
