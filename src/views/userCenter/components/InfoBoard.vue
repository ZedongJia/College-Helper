<template>
    <!--
        1.账号
        2. 密码重设
        3. 昵称
        4. 头像
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
        <div style="width: 10%;">侧边栏修饰</div>
        <InfoForm
            style="width: 60%;"
            title="表单信息修改"
            :inputs="inputs"
            :buttons="buttons"
            @receive="r"
        ></InfoForm>
        <div style="width: 10%;">侧边栏修饰</div>
    </Board>
</template>
<script>
export default {
    data() {
        return {
            inputs: [
                {
                    type: 'text',
                    title: '头像图片',
                    symbol: 'imgUrl'
                },
                {
                    type: 'text',
                    title: '昵称',
                    symbol: 'nickName'
                },
                {
                    type: 'text',
                    title: '账号',
                    symbol: 'account'
                },
                {
                    type: 'password',
                    title: '密码',
                    symbol: 'password'
                },
                {
                    type: 'password',
                    title: '确认密码',
                    symbol: 'confirm'
                },
                {
                    type: 'checkbox',
                    title: '性别',
                    options: ['男', '女'],
                    symbol: 'gender'
                },
                {
                    type: 'text',
                    title: '电话',
                    symbol: 'telephone'
                },
                {
                    type: 'text',
                    title: '邮件地址',
                    symbol: 'email'
                },
                {
                    type: 'text',
                    title: 'QQ',
                    symbol: 'qq'
                },
                {
                    type: 'text',
                    title: '微信',
                    symbol: 'weChat'
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
            imgUrl: '',
            nickName: 'hh',
            account: 'bvvfdcx',
            password: '......',
            confirm: '......',
            gender: 'male',
            telephone: '1245745745',
            email: '1144@qq.com',
            qq: '1144',
            weChat: '1144'
        }
        Object.values(userInfo).forEach((item, index) => {
            this.inputs[index].value = item
        })
    }
}
</script>
<style></style>
