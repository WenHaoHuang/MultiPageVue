<template>
    <div class="container">
        <div class="section-body mt20">
            <div class="list-info flex">
                <div class="item-body" v-for="item in baseData" :key="item.id">
                    <div class="item-chart mb30">
                        <e-chart :options="optFn(item.data)"></e-chart>
                    </div>
                    <div class="item flex flex-justify-between flex-align-center" v-for="list in item.data"
                         :key="list.id">
                        <div class="item-hd">{{list.name}}</div>
                        <div class="item-ft text-danger">{{list.count}}</div>
                    </div>
                    <div class="item-bname mt40">{{item.bInfo.bName}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "infoIndex",
        data() {
            return {
                baseData: []
            }
        },
        mounted() {
            this.getData()
        },
        methods: {
            getData(key) {
                const options = {
                    api: '/gis/gisSensorSummary',
                    type: 2
                }
                options.params = key ? {likeBName: key} : ''
                this.$ajax(options, (response) => {
                    this.baseData = response.data
                })
            },
            optFn(item) {
                const legendData = [], seriesData = []
                item.forEach(item => {
                    legendData.push(item.name)
                    seriesData.push({
                        name: item.name,
                        value: item.count
                    })
                })
                const option = {
                    color: ['#FF024F', '#43B7F1'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b}: {c} ({d}%)"
                    },
                    series: [
                        {
                            name: '信息管理',
                            type: 'pie',
                            radius: ['40%', '55%'],
                            data: seriesData
                        }
                    ]
                }
                return option
            }
        }
    }
</script>

<style lang="scss" scoped>
    .section-body {
        background-color: #262C42;
        padding: 0.2rem;
        .list-info {
            flex-wrap: wrap;
        }
        .item-body {
            width: 6rem;
            margin-right: 0.2rem;
            margin-bottom: 0.2rem;
            background-color: #363F5F;
            padding: 0.2rem;
        }
        &:last-child {
            margin-right: 0;
        }
        .item-bname {
            height: 1.28rem;
            background: transparent url("~assets/img/bg_buiding.png") scroll left center no-repeat;
            background-size: auto 100%;
            padding-left: 1.5rem;
            font-size: 0.4rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-content: center;
        }
        .item-chart {
            height: 6rem;
            background-color: #071132;
        }
    }
</style>
