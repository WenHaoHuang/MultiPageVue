<template>
    <div class="container">
        <div class="section-list mt40">
            <div class="item-cell flex flex-justify-between flex-align-center text-center" v-for="item in listData"
                 :key="item.id">
                <div class="item flex-bd text-left">{{item.buildingName}}</div>
                <div class="item flex-bd">{{item.deviceName}}</div>
                <div class="item flex-bd item-postion">{{item.faulty}}</div>
                <div class="item flex-bd text-right text-danger" v-html="(item.state == 1)?'未处理':'已处理'"></div>
            </div>
        </div>
        <!--<page-bar :pageBean="pageBean" @onClick="pageFn"></page-bar>-->
    </div>
</template>

<script>
    import pageBar from 'components/pageBar'

    export default {
        name: "index",
        components: {
            pageBar
        },
        data() {
            return {
                listData: [],
                pageBean: {},
                pageTotal: '',
                pageIndex: 1
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData(key) {
                const options = {
                    api: '/gis/gisOverdueEquipment',
                    params: {
                        pageIndex: this.pageIndex,
                        pageSize: 10
                    },
                    type: 2
                }
                options.params.likeBName = key ? key : ''
                this.$ajax(options, (response) => {
                    this.listData = response.data
                    this.pageBean = response.pageBean
                })
            },
            pageFn(page) {
                this.pageIndex = page;
                this.getData()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .section-list {
        background-color: #263056;
        .item-cell {
            color: #FBFF03;
            padding: 0.2rem;
            .item-postion {
                flex: 2;
            }
            &:nth-child(2n) {
                background-color: #222547;
            }
        }
    }
</style>
