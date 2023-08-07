<template>
    <div class="wrapper">
        <Board class="feedback">
            <br />
            <fieldset>
                <legend>反馈ACTIVE</legend>
                <InfoForm
                    style="width: 50%"
                    :inputs="infoInputs"
                    @receive="r"
                ></InfoForm>
            </fieldset>
            <br />
            <fieldset>
                <legend>处理ACTIVE</legend>
                <MessageList
                    style="width: 100%"
                    bigIcon="mail-open-outline"
                    :messageDict="feedbackDict"
                    :headers="['时间', '反馈ID', '状态']"
                    :colWidth="[20, 40, 40]"
                    nodel
                    nocursor
                ></MessageList>
            </fieldset>
            <br />
        </Board>
    </div>
</template>
<script>
export default {
    data() {
        return {
            infoInputs: [
                {
                    type: 'file',
                    title: '相关图片',
                    symbol: 'imgUrl',
                    accept: 'image/*'
                },
                {
                    type: 'checkbox',
                    title: '反馈类别',
                    options: ['实体', '关系', '新增'],
                    labels: ['entity', 'relation', 'addNew'],
                    symbol: 'category',
                    value: 'entity'
                },
                {
                    type: 'text',
                    title: '反馈问题',
                    symbol: 'phone',
                    icon: 'document-outline'
                },
                {
                    type: 'text',
                    title: '建议',
                    symbol: 'phone',
                    icon: 'document-outline'
                }
            ],
            feedbackDict: {
                实体: [
                    {
                        time: '8:59:00',
                        id: 0,
                        state: '待处理'
                    }
                ],
                关系: [
                    {
                        time: '8:59:00',
                        id: 1,
                        state: '待处理'
                    }
                ],
                新增: [
                    {
                        time: '8:59:00',
                        id: 2,
                        state: '待处理'
                    }
                ]
            }
        }
    },
    methods: {
        r() {
            // todo
        }
    }
}
</script>
<style>
.feedback fieldset {
    margin: 0 auto;
    width: 90%;
    padding: 2em;
    border: none;
    box-shadow: -10px -10px var(--item-bg-color), 5px 5px 10px var(--item-bg-color);
    border-radius: 20px;
}
.feedback legend {
    transform: translate(0, -15%);
    padding: 5px 10px;
    font-size: 1.2em;
    font-weight: 700;
    border-radius: 10px;
    background-color: var(--item-bg-color);
    color: var(--item-font-color);
}
</style>
