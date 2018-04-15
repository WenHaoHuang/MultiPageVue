<template>
    <div class="container">
        <div class="section-head mt30 flex flex-justify-between flex-align-center">
            <div class="item-head text-center">
                <div class="item-hd">总完成率</div>
                <div class="item-desc text-danger">{{baseData.complete}}%</div>
            </div>
            <div class="item-head text-center">
                <div class="item-hd">设备完好率</div>
                <div class="item-desc text-danger">{{baseData.good}}%</div>
            </div>
        </div>
        <div class="section-body mt20">
            <div class="cell-hd pb30">楼宇巡检信息：</div>
            <div class="list-info flex">
                <div class="item-body" v-for="item in extendData" :key="item.id">
                    <div class="item flex flex-justify-between flex-align-center">
                        <div class="item-hd">巡检完成率：{{item.data.inspectCompleteRate}}%</div>
                        <div class="item-ft">设备完好率：{{item.data.deviceGoodRate}}%</div>
                    </div>
                    <div class="item-chart mt30">
                        <e-chart :options="optFn(item.data)"></e-chart>
                    </div>
                    <div class="item-bname mt40">{{item.bInfo.bName}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        name: "index",
        data() {
            return {
                baseData: [],
                extendData: []
            }
        },
        mounted() {
            this.getBaseData()
            this.getData()
        },
        methods: {
            getBaseData() {
                this.$ajax({
                    api: '/gis/gisInspectSituation',
                    type: 2
                }, (response) => {
                    this.baseData = response.data
                })
            },
            getData(key) {
                const options = {
                    api: '/gis/gisInspectCompleteStatus',
                    type: 2
                }
                options.params = key ? {likeBName: key} : ''
                this.$ajax(options, (response) => {
                    this.extendData = response.data
                })
            },
            optFn(item){
                const option = {
                    color: ['#FF024F', '#43B7F1'],
                    series: [{
                        name: '巡检完成率',
                        type: 'pie',
                        radius: ['40%', '50%'],
                        label: {normal: {show: false}},
                        clockwise: false,
                        legendHoverLink: false,
                        hoverAnimation: false,
                        data: [
                            {
                                value: item["inspectCompleteRate"],
                                name: '巡检完成率',
                                label: {normal: {show: true, position: 'inner', formatter: '{a}:{d}%'}}
                            },
                            {
                                value: (100 - item["inspectCompleteRate"]),
                                name: '',
                                itemStyle: {normal: {color: '#071034'}}
                            }]
                    }, {
                        name: '设备完好率',
                        type: 'pie',
                        radius: ['60%', '70%'],
                        label: {normal: {position: 'inner'}},
                        clockwise: false,
                        legendHoverLink: false,
                        hoverAnimation: false,
                        data: [
                            {
                                value: item["deviceGoodRate"],
                                name: '设备完好率',
                                label: {normal: {position: 'inner', formatter: '{a}:{d}%'}}
                            },
                            {
                                value: (100 - item["deviceGoodRate"]),
                                name: '',
                                itemStyle: {normal: {color: '#071034'}}
                            }]
                    }]
                }
                return option
            }
        }
    }
</script>

<style lang="scss" scoped>
    .section-head {
        .item-head {
            margin-right: 0.2rem;
            flex: 1;
            background-color: #262C42;
            padding: 0.2rem;
            .item-desc {
                font-size: 0.6rem;
            }
            &:last-child {
                margin-right: 0;
            }
        }
    }

    .section-body {
        background-color: #262C42;
        padding: 0.2rem;
        .list-info {
            flex-wrap: wrap;
        }
        .item-body {
            width: 8rem;
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
        .item-chart{
            height:6rem;
            background-color: #071132;
        }
    }
</style>
