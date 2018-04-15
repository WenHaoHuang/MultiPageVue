<template>
    <div class="container">
        <div class="section-body mt20" v-for="item in baseData" :key="item.id">
            <div class="item-body" v-for="list in item.data" :key="list.id">
                <div class="item-chart mb30">
                    <e-chart :options="optFn(list)"></e-chart>
                </div>
                <div class="item-list flex flex-justify-start flex-align-center">
                    <div class="item flex flex-justify-between flex-align-center" v-for="obj in dataFn(list.pointCollection)"
                         :key="obj.id">
                        <div class="flex-bd">{{obj.name}}</div>
                        <div class="flex-bd text-danger">{{obj.value}}</div>
                    </div>
                </div>
            </div>
            <div class="item-bname mt40">{{item.bInfo.bName}}</div>
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
                    api: '/gis/gisHostSummary',
                    type: 2
                }
                options.params = key ? {likeBName: key} : ''
                this.$ajax(options, (response) => {
                    this.baseData = response.data
                })
            },
            optFn(item) {
                const data = item.pointCollection
                const axisData = [], seriesData = []
                const colors = ['#895629', '#437EC2', '#5241FF', '#5391F6', '#B340FF', '#F09A24', '#E14240', '#BF3944', '#DF3B6E', '#CCC036', '#50BD9F', '#709842']
                let index = 0
                for (let obj in data){
                    axisData.push(obj)
                    seriesData.push({
                        value: data[obj],
                        itemStyle: {
                            color: colors[index]
                        }
                    })
                    index = (index + 1 > colors.length) ? 0 : index+1
                }
                const option = {
                    title: {
                        text: '传感器接入数',
                        textStyle: {
                            color: '#43b7f1',
                            fontSize: 14
                        },
                        right: '0'
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        top: '15%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: axisData,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#43b7f1'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#43b7f1'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '主机设施',
                            type: 'bar',
                            data: seriesData
                        }
                    ]
                }
                return option
            },
            dataFn(item){
                const arr = []
                for (let obj in item){
                    arr.push({
                        value: item[obj],
                        name: obj
                    })
                }
                return arr
            }
        }
    }
</script>

<style lang="scss" scoped>
    .section-body {
        background-color: #262C42;
        padding: 0.2rem;
        .item-body {
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
        .item-list{
            flex-wrap:wrap;
            .item{
                width:20%;
            }
        }
    }
</style>
