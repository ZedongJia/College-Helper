<template lang="">
    <!--
        5. 电话
        6. 性别
        7. 邮箱(用于个人信息识别和与他人交流)
        8. QQ
        9. 微信
     -->
    <InfoForm
        style="margin-left: 32px; width: 60%;"
        :inputs="inputs"
        :buttons="buttons"
        @receive="r"
    ></InfoForm>
</template>
<script>
import { getPrivacyInfo } from '@/api/user'
export default {
    data() {
        return {
            inputs: [
                {
                    type: 'checkbox',
                    title: '是否显示',
                    options: ['是', '否'],
                    symbol: 'gender_priv'
                },
                {
                    type: 'checkbox',
                    title: '是否显示电话',
                    options: ['是', '否'],
                    symbol: 'telephone_priv'
                },
                {
                    type: 'checkbox',
                    title: '是否显示邮件地址',
                    options: ['是', '否'],
                    symbol: 'email_priv'
                },
                {
                    type: 'checkbox',
                    title: '是否显示QQ',
                    options: ['是', '否'],
                    symbol: 'qq_priv'
                },
                {
                    type: 'checkbox',
                    title: '是否显示微信',
                    options: ['是', '否'],
                    symbol: 'weChat_priv'
                }
                // {
                //     type: 'checkbox',
                //     title: '是否显示收藏',
                //     options: ['是', '否'],
                //     symbol: 'collection_priv'
                // }
            ],
            buttons: [{
                title: '提交',
                symbol: 'commit'
            }]
        }
    },
    methods: {
        r(receive) {
            // todo
            // const { name, inputsF } = receive
            // switch (name) {
            //     case 'commit':
            //         // todo inputsF
            //         break
            // }
        }
    },
    created() {
        // require
        // do sth
        getPrivacyInfo({
            id: this.$store.state.userInfo.ID
        })
            .then((response) => {
                const temp = response.data[0]
                delete temp.user_ID
                Object.values(temp).forEach((item, index) => {
                    item === 'true' ? this.inputs[index].value = '是' : this.inputs[index].value = '否'
                })
                console.log(this.inputs)
            })
            .catch(() => {
                console.log('网络故障，请重试')
            })
            // const userInfo = {
            //     gender_priv: '是',
            //     telephone_priv: '是',
            //     email_priv: '是',
            //     qq_priv: '否',
            //     weChat_priv: '是'
            // }
            // Object.values(userInfo).forEach((item, index) => {
            //     this.inputs[index].value = item
            // })
            // console.log(this.inputs)
    }
}
</script>
<style></style>
