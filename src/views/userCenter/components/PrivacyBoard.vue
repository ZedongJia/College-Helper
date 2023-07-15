<template lang="">
    <!--
        5. 电话
        6. 性别
        7. 邮箱(用于个人信息识别和与他人交流)
        8. QQ
        9. 微信
     -->
    <Board
        class="flex-row-evenly"
        inset
    >
        <div style="width: 10%">侧边栏修饰</div>
        <InfoForm
            style="width: 60%"
            title="隐私权限设置"
            :inputs="inputs"
            :buttons="buttons"
            @receive="r"
        ></InfoForm>
        <div style="width: 10%">侧边栏修饰</div>
    </Board>
</template>
<script>
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
                },
                {
                    type: 'checkbox',
                    title: '是否显示收藏',
                    options: ['是', '否'],
                    symbol: 'collection_priv'
                }
            ],
            buttons: ['commit']
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
        const userInfo = {
            gender_priv: '是',
            telephone_priv: '是',
            email_priv: '是',
            qq_priv: '是',
            weChat_priv: '是',
            collection_priv: '是'
        }
        Object.values(userInfo).forEach((item, index) => {
            this.inputs[index].value = item
        })
    }
}
</script>
<style></style>
