<template>
    <board>
        <Title title="关系图表"></Title>
    </board>
    <Board style="padding: 0">
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
                <TransitionGroup name="list" mode="out-in">
                    <tr
                        v-for="itemTable in tableContent"
                        :key="itemTable"
                    >
                        <td>{{ itemTable.source }}</td>
                        <td>{{ itemTable.label }}</td>
                        <td>{{ itemTable.target }}</td>
                    </tr>
                </TransitionGroup>
            </tbody>
        </table>
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
    text-align: center;
    border-collapse: collapse;
}
.myform thead td {
    font-weight: bold;
}
.myform td {
    cursor: default;
    padding: 0 10px;
    height: 48px;
    line-height: 48px;
    text-align: center;
}
.myform img {
    cursor: pointer;
    opacity: 0.5;
    width: 20px;
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translate(0, -50%);
    transition: 0.25s;
}
.myform img:hover {
    opacity: 1;
}
.myform thead tr {
    background: var(--item-bg-color);
    color: var(--item-font-color);
    transition: 0.25s;
}
.myform thead tr:hover {
    background: var(--item-bg-rev-color);
    color: var(--item-font-rev-color);
}
.myform tbody tr {
    border-bottom: 1px solid var(--item-bg-color);
}
.myform tbody tr:last-child {
    border-bottom: none;
}
</style>
