<template>
    <div class="flex-row">
        <Button
            @clickIt="getUserAllInfo1"
            style="width: 15%"
        >
            获取用户信息
        </Button>
        userAllInfo: {{ userAllInfo }}
        <Button
            @clickIt="updateUserInfo1"
            style="width: 15%"
        >
            更新用户信息
        </Button>
    </div>
    <div class="flex-row">
        <Button
            @clickIt="getPrivacyInfo1"
            style="width: 15%"
        >
            获取隐私信息
        </Button>
        userPrivacyInfo: {{ userPrivacyInfo }}
        <Button
            @clickIt="updatePrivacyInfo1"
            style="width: 15%"
        >
            更新隐私信息
        </Button>
    </div>
    <div class="flex-row">
        <Button
            @clickIt="getBrowseInfo1"
            style="width: 15%"
        >
            获取浏览信息
        </Button>
        userBrowseInfo: {{ userBrowseInfo }}
        <Button
            @clickIt="deleteBrowseInfo1"
            style="width: 15%"
        >
            删除浏览信息
        </Button>
    </div>
    <div class="flex-row">
        <Button
            @clickIt="getCollectedInfo1"
            style="width: 15%"
        >
            获取收藏信息
        </Button>
        userCollectedInfo: {{ userCollectedInfo }}
        <Button
            @clickIt="deleteCollectedInfo1"
            style="width: 15%"
        >
            删除收藏信息
        </Button>
    </div>
    <div class="flex-row">
        <Button
            @clickIt="getMessageList1"
            style="width: 15%"
        >
            获取聊天信息
        </Button>
        messageList: {{ messageList }}
        <Button
            @clickIt="getTruePrivacy1"
            style="width: 15%"
        >
            获取不公开的隐私信息
        </Button>
        truePrivacyInfo: {{ truePrivacyInfo }}
    </div>
</template>
<script>
import { mapState } from 'vuex'
import { getUserInfo, updateUserInfo, getPrivacyInfo, updatePrivacyInfo, getBrowseInfo, deleteBrowseInfo, getCollectedInfo, deleteCollectedInfo, getMessageList, getTruePrivacy } from '@/api/user'
export default {
    data() {
        return {
            userAllInfo: {},
            userPrivacyInfo: {},
            userBrowseInfo: [],
            userCollectedInfo: [],
            messageList: [],
            truePrivacyInfo: [],
            newInfo: {
                ID: this.$store.state.userInfo.ID,
                nick_name: 'abc',
                account: 'hakjs',
                password: '111',
                image: 'ddd',
                telephone: '19356843105',
                gender: 'male',
                email: '12321321@qq.com',
                QQ: '1232121',
                weChat: '312312312hh'
            },
            privacyInfo: {
                user_ID: this.$store.state.userInfo.ID,
                telephone_priv: false,
                gender_priv: false,
                email_priv: true,
                QQ_priv: false,
                weChat_priv: false
            },
            deleteBrowseInfo: {
                time: '2022-07-06 08:56:20',
                type: '农业1',
                user_ID: this.$store.state.userInfo.ID
            },
            deleteCollectedInfo: {
                time: '2022-07-06 08:56:20',
                type: '农业1',
                user_ID: this.$store.state.userInfo.ID
            }
        }
    },
    methods: {
        getUserAllInfo1() {
            console.log(this.$store.state.userInfo.ID)
            getUserInfo({
                id: this.$store.state.userInfo.ID
            })
                .then((response) => {
                    if (JSON.stringify(response.data) !== '{}') {
                        // 产生提示框
                        console.log(response.data)
                        this.userAllInfo = response.data
                    } else {
                        console.log('失败')
                    }
                })
                .catch(() => {
                    console.log('网络故障，请重试')
                })
        },
        updateUserInfo1() {
            updateUserInfo(this.newInfo)
                .then((response) => {
                    if (JSON.stringify(response.data) !== '{}') {
                        // 产生提示框
                        console.log(response.data)
                        this.userAllInfo = response.data
                    } else {
                        console.log('失败')
                    }
                })
                .catch(() => {
                    console.log('网络故障，请重试')
                })
        },
        getPrivacyInfo1() {
            getPrivacyInfo({
                id: this.$store.state.userInfo.ID
            })
                .then((response) => {
                    if (JSON.stringify(response.data) !== '{}') {
                        // 产生提示框
                        console.log(response.data)
                        this.userPrivacyInfo = response.data
                    } else {
                        console.log('失败')
                    }
                })
                .catch(() => {
                    console.log('网络故障，请重试')
                })
        },
        getTruePrivacy1() {
            getTruePrivacy({
                id: this.$store.state.userInfo.ID
            })
                .then((response) => {
                    if (JSON.stringify(response.data) !== '{}') {
                        // 产生提示框
                        console.log(response.data)
                        this.truePrivacyInfo = response.data
                    } else {
                        console.log('失败')
                    }
                })
                .catch(() => {
                    console.log('网络故障，请重试')
                })
        },
        updatePrivacyInfo1() {
            updatePrivacyInfo(this.privacyInfo)
                .then((response) => {
                    if (JSON.stringify(response.data) !== '{}') {
                        // 产生提示框
                        console.log(response.data)
                        this.userPrivacyInfo = response.data
                    } else {
                        console.log('失败')
                    }
                })
                .catch(() => {
                    console.log('网络故障，请重试')
                })
        },
        getBrowseInfo1() {
            getBrowseInfo({
                id: this.$store.state.userInfo.ID
            })
                .then((response) => {
                    if (JSON.stringify(response.data) !== '{}') {
                        // 产生提示框
                        // const temp = JSON.parse(response.data)
                        console.log(response.data)
                        this.userBrowseInfo = JSON.stringify(response.data)
                    } else {
                        console.log('失败')
                    }
                })
                .catch(() => {
                    console.log('网络故障，请重试')
                })
        },
        deleteBrowseInfo1() {
            deleteBrowseInfo(this.deleteBrowseInfo)
                .then((response) => {
                    if (JSON.stringify(response.data) !== '{}') {
                        // 产生提示框
                        console.log(response.data)
                    } else {
                        console.log('失败')
                    }
                })
                .catch(() => {
                    this.generatePrompt('网络故障，请重试')
                })
        },
        getCollectedInfo1() {
            getCollectedInfo({
                user_ID: this.$store.state.userInfo.ID
            })
                .then((response) => {
                    if (JSON.stringify(response.data) !== '{}') {
                        // 产生提示框
                        // const temp = JSON.parse(response.data)
                        console.log(response.data)
                        this.userCollectedInfo = JSON.stringify(response.data)
                    } else {
                        console.log('失败')
                    }
                })
                .catch(() => {
                    console.log('网络故障，请重试')
                })
        },
        deleteCollectedInfo1() {
            deleteCollectedInfo(this.deleteCollectedInfo)
                .then((response) => {
                    if (JSON.stringify(response.data) !== '{}') {
                        // 产生提示框
                        console.log(response.data)
                    } else {
                        console.log('失败')
                    }
                })
                .catch(() => {
                    this.generatePrompt('网络故障，请重试')
                })
        },
        getMessageList1() {
            getMessageList({
                user1_ID: this.$store.state.userInfo.ID,
                user2_ID: 1
            })
                .then((response) => {
                    if (JSON.stringify(response.data) !== '{}') {
                        // 产生提示框
                        // const temp = JSON.parse(response.data)
                        console.log(response.data)
                        this.messageList = JSON.stringify(response.data)
                    } else {
                        console.log('失败')
                    }
                })
                .catch(() => {
                    console.log('网络故障，请重试')
                })
        }
    },
    computed: {
        ...mapState({
            ID: (state) => state.userInfo.ID
        })
    }
}
</script>
<style></style>
