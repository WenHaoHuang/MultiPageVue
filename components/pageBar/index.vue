<template>
    <div class="page-bar">
        <div class="item" :class="{'disabled':pageBean.pageIndex <= 1}" @click="pageFn(pageBean.pageIndex - 1)">上一页
        </div>
        <div class="item" @click="pageFn(1)" v-show="pageBean.pageIndex>=4">1</div>
        <div class="item-connect" v-show="showPrevMore && pageBean.pageIndex != 4">…</div>
        <div class="item" v-for="pager in pagers" :key="pager.id"
             :class="{'disabled current':pager == pageBean.pageIndex}" @click="pageFn(pager)">{{pager}}
        </div>
        <div class="item-connect" v-show="showNextMore && pageBean.pageIndex != pageBean.pageTotal - 3">…</div>
        <div class="item" @click="pageFn(pageBean.pageTotal)" v-show="pageBean.pageIndex <= pageBean.pageTotal - 2">
            {{pageBean.pageTotal}}
        </div>
        <div class="item" :class="{'disabled':pageBean.pageIndex >= pageBean.pageTotal}"
             @click="pageFn(pageBean.pageIndex + 1)">下一页
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                showPrevMore: false,
                showNextMore: false
            }
        },
        props: {
            pageBean: {}
        },
        computed: {
            pagers() {
                const arr = []

                const perPages = 5, pageCount = this.pageBean.pageTotal, current = this.pageBean.pageIndex

                const _offset = (perPages - 1) / 2
                const offset = {
                    start: current - _offset,
                    end: current + _offset
                }
                if (offset.start < 1) {
                    offset.end = offset.end + (1 - offset.start)
                    offset.start = 1
                }
                if (offset.end > pageCount) {
                    offset.start = offset.start - (offset.end - pageCount)
                    offset.end = pageCount
                }
                if (offset.start < 1) offset.start = 1


                this.showPrevMore = (offset.start > 1)
                this.showNextMore = (offset.end < pageCount)

                for (let i = offset.start; i <= offset.end; i++) {
                    arr.push(i)
                }
                return arr
            }
        },
        methods: {
            pageFn(page) {
                this.$emit('onClick', page)
            }
        }
    }
</script>

<style lang="scss">
    .page-bar {
        padding: 0.6rem 0 0 0;
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        .item {
            margin-left: 0.1rem;
            padding: 0.2rem 0.4rem;
            border-radius: 0.04rem;
            background-color: #CCC;
            color: #555;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            &.current, &:hover {
                color: #FFF;
                background-color: #1ab394;
            }
        }
        .item-connect {
            margin-left: 0.1rem;
        }
    }
</style>
