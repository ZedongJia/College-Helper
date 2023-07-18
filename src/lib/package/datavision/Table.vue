<template>
    <Board>
        <Loading v-if="isLoading"></Loading>
        <EmptyHint v-if="isEmpty && !isLoading"></EmptyHint>
        <table
            v-if="!isEmpty && !isLoading"
            class="myform"
        >
            <thead>
                <tr>
                    <td
                        style="height: 32px; position: relative"
                        v-for="(itemHeader, index) in tableHeader"
                        :key="itemHeader"
                    >
                        {{ itemHeader.name }}
                        <img
                            src="@/assets/icons/sort.png"
                            @click="Sort(index)"
                        />
                    </td>
                </tr>
            </thead>
            <tbody>
                <TransitionGroup
                    name="list"
                >
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
    name: 'Table',
    props: {
        isLoading: Boolean,
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
    },
    computed: {
        isEmpty() {
            return (
                this.link === undefined ||
                this.link === null ||
                this.link.length === 0
            )
        }
    }
}
</script>
<style>
.myform {
    margin: 0 auto;
    table-layout: fixed;
    width: 100%;
    text-align: center;
    border-collapse: collapse;
}
.myform thead td {
    font-weight: bold;
    /* font-family: Verdana; */
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
    /* border-bottom: 2px solid var(--item-bg-color);
    border-top: 2px solid var(--item-bg-color); */
}
.myform thead tr td {
    transition: 0.25s;
}
.myform thead tr td:hover {
    background: var(--item-bg-rev-color);
    color: var(--item-font-rev-color);
}
.myform tbody tr {
    color: rgb(16, 47, 26);
}
.myform tbody tr:nth-child(even) {
    /* border-bottom: 2px solid var(--item-bg-color); */
    background: #8fbc8f;
    /* #8fbc8f */
    /* rgb(112, 178, 150) */
}
.myform tbody tr:nth-child(odd) {
    /* border-bottom: 2px solid var(--item-bg-color); */
    background: rgb(199, 237, 184);
    /* #8fbc8f */
    /* rgb(112, 178, 150) */
}
.myform tbody tr:last-child {
    border-bottom: none;
}
</style>
