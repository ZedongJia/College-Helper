<template>
    <MessageList
        style="width: 70%;"
        :messageDict="historyDict"
        :headers="['时间','查询分类','内容']"
        :colWidth="[10, 20, 70]"
        @query="turnTo"
        @del="del"
    ></MessageList>
</template>
<script>
import { getBrowseInfo } from '@/api/user'
export default {
    data() {
        return {
            historyDict: {}
        }
    },
    methods: {
        turnTo(group, index) {
            const { type, content } = this.historyDict[group][index]
            let page = ''
            switch (type) {
                case '实体识别':
                    page = 'identification'
                    break
                case '关系查询':
                    page = 'relationSearch'
                    break
                case '实体查询':
                    page = 'entitySearch'
                    break
            }
            this.$router.push({
                path: page,
                meta: {
                    content: content
                }
            })
        },
        del(group, index) {
            // todo
        }
    },
    created() {
        // require
        getBrowseInfo({
                id: this.$store.state.userInfo.ID
            })
                .then((response) => {
                    if (JSON.stringify(response.data) !== '{}') {
                        const temp = response.data
                        for (let i = 0; i < temp.length; i++) {
                            // 获取日期
                            const datatime = temp[i].time.split(' ')[0]
                            // 获取时间
                            temp[i].time = temp[i].time.split(' ')[1]
                            if (datatime in this.historyDict) {
                                this.historyDict[datatime].push(temp[i])
                            } else {
                                this.historyDict[datatime] = [temp[i]]
                            }
                        }
                        console.log(this.historyDict)
                    } else {
                        console.log('失败')
                    }
                })
                .catch(() => {
                    console.log('网络故障，请重试')
                })
        // this.historyDict = {
        //     '2021-5-6': [
        //         {
        //             time: '8:59',
        //             type: '实体查询',
        //             content: '玉米'
        //         },
        //         {
        //             time: '8:59',
        //             type: '实体识别',
        //             content: '袁隆平是xxx得到的'
        //         },
        //         {
        //             time: '8:59',
        //             type: '关系查询',
        //             content: '玉米属于植物'
        //         }
        //     ],
        //     '2021-5-5': [
        //         {
        //             time: '8:59',
        //             type: '实体查询',
        //             content: '玉米'
        //         },
        //         {
        //             time: '8:59',
        //             type: '实体识别',
        //             content: '袁隆平是xxx得到的'
        //         },
        //         {
        //             time: '8:59',
        //             type: '关系查询',
        //             content: '玉米属于植物'
        //         }
        //     ]
        // }
    }
}
</script>
