<template>
    <PopFrame>
        <div style="width: 40%; margin: 180px 0px 0px 40%">
            <Board style="border-radius: 20px; text-align: center">
                <h3>清空聊天记录</h3>
                <hr style="margin: 3% 0 3% 0" />
                <p>确定清空当前对话内容吗？此操作将无法恢复！</p>
                <hr style="margin: 3% 0 3% 0" />
                <div style="align-items: center">
                    <Button
                        @clickIt="back"
                        style="margin-right: 10px"
                    >
                        取消
                    </Button>
                    <Button @clickIt="confirm"> 确定 </Button>
                </div>
            </Board>
        </div>
    </PopFrame>
</template>
<script>
export default {
    name: 'WarningBox',
    props: {
        content: String
    },
    methods: {
        confirm(e) {
            this.$emit('confirm', e)
        },
        back(e) {
            this.$emit('back', e)
        }
    }
}
</script>
<style>
</style>
