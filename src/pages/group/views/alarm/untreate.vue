<template>
    <div class="container">
        <div class="section-list mt40">
            <div class="item-cell flex flex-justify-between flex-align-center text-center" v-for="item in listData"
                 :key="item.id">
                <div class="item flex-bd text-left">{{item.floorName}}</div>
                <div class="item flex-bd">{{item.alarmValue}}</div>
                <div class="item flex-bd item-postion">{{item.postion}}</div>
                <div class="item flex-bd">从{{item.startTime | format}}到{{item.endTime | format}} 时长{{mindFn(item)}}</div>
                <div class="item flex-bd text-right text-danger" v-html="(item.handleTag == 0)?'未处理':'已处理'"></div>
            </div>
        </div>
        <page-bar :pageBean="pageBean" @onClick="pageFn"></page-bar>
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
                    api: '/gis/gisUntreatedAlarmList',
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
            },
            mindFn(item){
                const endTime = item.endTime ? item.endTime : new Date()
                const start = new Date(item.startTime).getTime()
                const end = new Date(endTime).getTime()
                let result = (end - start)/1000
                if(result < 60){
                    result += '秒'
                } else if(result < 3600){
                    result = (result/60).toFixed(0) +  '分'
                } else {
                    result = (result/60/60).toFixed(0) +  '时'
                }
                return result
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
