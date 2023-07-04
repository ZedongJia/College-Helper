<template>
    <board>关系图表</board>
    <Board>
        <div style="margin: 3px">
            <table class="myform">
                <thead>
                    <tr>
                        <td
                            style="height: 32px; position: relative"
                            v-for="itemHeader, index in tableHeader"
                            :key="itemHeader"
                        >
                            {{ itemHeader.name }}
                            <img
                                src="..\assets\icons\sort.png"
                                @click="Sort(index)"
                            />
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="itemTable in tableContent"
                        :key="itemTable"
                    >
                        <td>{{ itemTable.source }}</td>
                        <td>{{ itemTable.label }}</td>
                        <td>{{ itemTable.target }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </Board>
</template>
<script>
export default {
    props: {
        link: Array
    },
    data() {
        return {
            isSort: false,
            tableHeader: [
                { id: 0, name: '实体1' },
                { id: 1, name: '关系' },
                { id: 2, name: '实体2' }
            ],
            tableContent: this.link
        }
    },
    methods: {
        // 升序函数
        compareAsc(index) {
            return function (a, b) {
                const tempA = Object.values(a)
                const tempB = Object.values(b)
                if (tempA[index] > tempB[index]) {
                    // console.log(a[type] + ' > ' + b[type])
                    return 1
                } else {
                    // console.log(a[type] + ' < ' + b[type])
                    return -1
                }
            }
        },
        // 降序函数
        compareDes(index) {
            return function (a, b) {
                const tempA = Object.values(a)
                const tempB = Object.values(b)
                if (tempA[index] > tempB[index]) {
                    // console.log(a[type] + ' > ' + b[type])
                    return -1
                } else {
                    // console.log(a[type] + ' < ' + b[type])
                    return 1
                }
            }
        },
        Sort(index) {
            // todo
            if (this.isSort) {
                // 降序排列
                this.tableContent = this.tableContent.sort(
                    this.compareDes(index)
                )
                this.isSort = false
            } else {
                // 升序排列
                this.tableContent = this.tableContent.sort(
                    this.compareAsc(index)
                )
                this.isSort = true
            }
        }
    }
}
</script>
<style>
.myform {
    width: 100%;
    border-spacing: 0px;
    border-right: 1px solid rgb(13, 212, 79);
    border-bottom: 1px solid rgb(13, 212, 79);
    text-align: center;
}
.myform td {
    border-left: 1px solid rgb(13, 212, 79);
    border-top: 1px solid rgb(13, 212, 79);
    padding: 0 10px;
    height: 48px;
    line-height: 48px;
    text-align: center;
}
.myform thead td {
    font-size: 24px;
}
.myform img {
    width: 24px;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(0, -50%);
}
.myform img:hover {
    width: 32px;
}
.myform thead tr {
    background: rgb(6, 143, 153);
}
.myform tbody tr:nth-child(even) {
    background: gray;
}
</style>
