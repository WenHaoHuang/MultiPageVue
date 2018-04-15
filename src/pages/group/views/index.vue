/**
* @author: wenhao.huang
* @date:   2018/3/14
* @module: index
*/
<template>
    <article id="main-index">
        <div class="main-tbody">
            <div class="side-index">
                <div class="side-logo"><img src="~assets/img/logo_index.png"></div>
                <!--天气 先不做-->
                <!--<div class="bar-side"></div>-->
                <div class="side-tbody mt40 pt20 pl30 pr30">
                    <div class="text-center text-md">当前告警（一级）</div>
                    <div class="alarm-list mt20">
                        <table class="table table-alarm">
                            <thead>
                            <tr>
                                <td class="item-id"></td>
                                <td>单位</td>
                                <td class="text-right">告警信息</td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-for="(item,index) in gisAlarmList" :key="item.id">
                                <td class="item-id"><span>{{index + 1}}</span></td>
                                <td>{{item.buildingName}}</td>
                                <td class="text-right text-warning">{{item.floorName}} {{item.sensortype}}
                                    {{item.alarmValue}}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="side-ft mt40">
                    <router-link :to="{name:'index'}" class="item item-md"><i class="icon icon-brain"></i>FireSec企业版
                    </router-link>
                    <router-link :to="{name:'index'}" class="item item-md"><i class="icon icon-report"></i>数据报表
                    </router-link>
                    <div class="item-md">
                        <router-link :to="{name:'alarm'}" class="item item-sm">告警管理</router-link>
                        <router-link :to="{name:'inspect'}" class="item item-sm">巡检管理</router-link>
                    </div>
                    <div class="item-md">
                        <router-link :to="{name:'video'}" class="item item-sm">视频管理</router-link>
                        <router-link :to="{name:'info'}" class="item item-sm">信息管理</router-link>
                    </div>
                </div>
            </div>
            <div class="main-section ml60">
                <div class="main-bar">
                    <div class="search">
                        <input type="text" v-model="searchKey" placeholder="搜索楼宇" class="search-bar">
                        <div class="btn-search" @click="getManyBuildingIn"></div>
                    </div>
                    <div class="menu-main">
                        <div class="item" @click="inBuildFn">接入楼宇</div>
                        <div class="item">
                            告警分布
                            <div class="sub-menu">
                                <div class="item-sub" @click="alermFn(0)">总体告警</div>
                                <div class="item-sub" @click="alermFn(1)">一级告警</div>
                                <div class="item-sub" @click="alermFn(2)">二级告警</div>
                                <div class="item-sub" @click="alermFn(3)">三级告警</div>
                                <div class="item-sub" @click="alermFn(4)">异常预警</div>
                            </div>
                        </div>
                        <!--<div class="item">火灾风险指数</div>-->
                    </div>
                </div>
                <div class="main-map">
                    <div class="arrow-before"></div>
                    <div class="arrow-after"></div>
                    <div class="map-box" id="section_many"></div>
                </div>
            </div>
        </div>
        <div class="main-charts mt60">
            <!--当前告警统计-->
            <div class="item-side current-alert">
                <div class="box-chart">
                    <e-chart :options="optCurrent"></e-chart>
                </div>
                <div class="box-info">
                    <div class="item flex flex-justify-between flex-align-center" v-for="item in gisAlarmLvData"
                         :key="item.id">
                        <div class="flex-bd">{{item.state}}</div>
                        <div class="flex-ft text-lg text-warning">{{item.count}}</div>
                    </div>
                </div>
            </div>
            <!--传感器接入数-->
            <div class="item-side current-alert">
                <div class="box-chart">
                    <e-chart :options="optGroupCount"></e-chart>
                </div>
                <div class="box-info">
                    <div class="item flex flex-justify-between flex-align-center" v-for="item in orderGisCountData"
                         :key="item.id">
                        <div class="flex-bd">{{item.name}}</div>
                        <div class="flex-ft text-lg text-warning">{{item.count}}</div>
                    </div>
                </div>
            </div>
            <!--当前告警统计-->
            <div class="item-side current-alert">
                <div class="box-chart">
                    <e-chart :options="optSituation"></e-chart>
                </div>
                <div class="box-info">
                    <div class="item flex flex-column flex-justify-center flex-align-center text-center">
                        <div class="flex-ft text-lg text-success">{{toFixedFn(gisSituationData.complete)}}%</div>
                        <div class="flex-hd">总完成率</div>
                    </div>
                    <div class="item flex flex-column flex-justify-center flex-align-center text-center">
                        <div class="flex-ft text-lg text-success">{{toFixedFn(gisSituationData.good)}}%</div>
                        <div class="flex-hd">设备完好率</div>
                    </div>
                </div>
            </div>
            <!--当前告警统计-->
            <div class="item-side current-alert">
                <div class="box-chart">
                    <e-chart :options="optGroupMonth"></e-chart>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    import AMap from 'AMap'

    export default {
        name: 'index',
        data() {
            return {
                gisAlarmList: [],
                gisAlarmLvData: [],
                optCurrent: {},
                gisGroupCountData: [],
                orderGisCountData: [],
                optGroupCount: {},
                gisSituationData: {},
                optSituation: {},
                optGroupMonth: {},
                searchKey: '',
                buildData:'',
                alarmData:[],
                map:'',
                timer:0
            }
        },
        mounted() {
            // this.getWeather()
            this.getManyBuildingIn()
            this.getGisShowAlarm()
            // 当前告警统计
            this.getGisAlarmLvData()
            // 传感器接入数
            this.getGisGroupCount()
            // 巡检完成率
            this.getGisInspectSituation()
            // 告警月报表
            this.getGisAlarmStateByMonth()
            this.alermFn(0)
        },
        methods: {
            colorRgb(color){
                const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
                var sColor = color.toLowerCase();
                if(sColor && reg.test(sColor)){
                    if(sColor.length === 4){
                        var sColorNew = "#";
                        for(var i=1; i<4; i+=1){
                            sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
                        }
                        sColor = sColorNew;
                    }
                    //处理六位的颜色值
                    var sColorChange = [];
                    for(var i=1; i<7; i+=2){
                        sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
                    }
                    return sColorChange.join(",");
                }else{
                    return sColor;
                }
            },
            inBuildFn() {
                this.alarmData = []
                this.searchKey = ''
                this.getManyBuildingIn()
            },
            alermFn(index) {
                const api = ['gisAlarmDistributionCount','gisAlarmLv1','gisAlarmLv2','gisAlarmLv3','gisAlarmExcetion']
                this.$ajax({
                    api: '/gis/' + api[index],
                    type: 2
                }, (response) => {
                    this.alarmData = response.data
                    this.mapReset(true)
                    if(index == 0){
                        this.timer = setTimeout(()=>{
                            if(this && !this._isDestroyed){
                                this.alermFn(index)
                            }
                        },5000)
                    } else {
                        clearTimeout(this.timer)
                    }
                })
            },
            getWeather() {
                this.$ajax({
                    api: 'weather',
                    type: 2
                }, (response) => {

                })
            },
            getGisShowAlarm() {
                this.$ajax({
                    api: '/gis/gisShowAlarm',
                    type: 2
                }, (response) => {
                    this.gisAlarmList = response.data;
                    setTimeout(()=>{
                        if(this && !this._isDestroyed){
                            this.getGisShowAlarm()
                        }
                    },5000)
                })
            },
            getGisInspectSituation() {
                this.$ajax({
                    api: '/gis/gisInspectSituation',
                    type: 2
                }, (response) => {
                    this.gisSituationData = response.data
                    const data = response.data
                    this.optSituation = {
                        title: {
                            text: '巡检完成率',
                            textStyle: {
                                color: '#43b7f1',
                                fontSize: 14
                            },
                            right: '0'
                        },
                        color: ['#FF024F', '#43B7F1'],
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            top: '15%',
                            containLabel: true
                        },
                        series: [{
                            name: '总完成率',
                            type: 'pie',
                            radius: ['40%', '50%'],
                            label: {normal: {show: false}},
                            clockwise: false,
                            legendHoverLink: false,
                            hoverAnimation: false,
                            data: [
                                {
                                    value: data["complete"],
                                    name: '总完成率',
                                    label: {normal: {show: true, position: 'inner', formatter: '{a}:{d}%'}}
                                },
                                {
                                    value: (100 - data["complete"]),
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
                                    value: data["good"],
                                    name: '设备完好率',
                                    label: {normal: {position: 'inner', formatter: '{a}:{d}%'}}
                                },
                                {
                                    value: (100 - data["good"]),
                                    name: '',
                                    itemStyle: {normal: {color: '#071034'}}
                                }]
                        }]
                    }
                })
            },
            getGisAlarmStateByMonth() {
                this.$ajax({
                    api: '/gis/gisAlarmStateByMonth',
                    // params:{
                    //     date:'2017-08-01'
                    // },
                    type: 2
                }, (response) => {
                    const data = response.data, seriesData = []
                    data.value.forEach((item) => {
                        seriesData.push({
                            name: item.name,
                            type: 'line',
                            stack: item.name,
                            data: item.data,
                            smoon: true
                        })
                    })
                    this.optGroupMonth = {
                        title: {
                            text: data.name,
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
                        xAxis: {
                            type: 'category',
                            data: data.axis,
                            axisLine: {
                                lineStyle: {
                                    color: '#43b7f1'
                                }
                            }
                        },
                        yAxis: {
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#43b7f1'
                                }
                            }
                        },
                        series: seriesData
                    }
                })
            },
            getGisAlarmLvData() {
                this.$ajax({
                    api: '/gis/gisAlarmLvData',
                    type: 2
                }, (response) => {
                    this.gisAlarmLvData = response.data;
                    const data = response.data
                    const indicator = [], seriesData = []
                    data.forEach((item) => {
                        seriesData.push(item.count)
                    })
                    const maxCount = Math.max.apply(Math, seriesData)
                    data.forEach((item) => {
                        indicator.push({
                            name: item.state,
                            max: maxCount
                        })
                    })
                    this.optCurrent = {
                        title: {
                            text: '当前告警统计',
                            textStyle: {
                                color: '#43b7f1',
                                fontSize: 14
                            },
                            right: '0'
                        },
                        radar: {
                            name: {
                                // show:false,
                                textStyle: {
                                    color: '#43b7f1',
                                    fontSize: '10'
                                }
                            },
                            nameGap: 0,
                            indicator: indicator
                        },
                        series: [{
                            name: '当前告警统计',
                            type: 'radar',
                            // areaStyle: {normal: {}},
                            data: [
                                {
                                    value: seriesData,
                                    name: '当前告警统计'
                                }
                            ]
                        }]
                    }
                })
            },
            getGisGroupCount() {
                this.$ajax({
                    api: '/gis/gisGroupCount',
                    type: 2
                }, (response) => {
                    this.gisGroupCountData = response.data
                    this.orderFn(response.data)
                    const data = response.data, axisData = [], seriesData = []
                    const colors = ['#895629', '#437EC2', '#5241FF', '#5391F6', '#B340FF', '#F09A24', '#E14240', '#BF3944', '#DF3B6E', '#CCC036', '#50BD9F', '#709842']
                    data.forEach((item, index) => {
                        axisData.push(item.name)
                        seriesData.push({
                            value: item.count,
                            itemStyle: {
                                color: colors[index]
                            }
                        })
                    })
                    this.optGroupCount = {
                        title: {
                            text: '传感器接入数',
                            textStyle: {
                                color: '#43b7f1',
                                fontSize: 14
                            },
                            right: '0'
                        },
                        tooltip: {},
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '0',
                            top: '15%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                show: false,
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
                                name: '传感器接入数',
                                type: 'bar',
                                data: seriesData
                            }
                        ]
                    }
                })
            },
            getManyBuildingIn() {
                clearTimeout(this.timer)
                const options = {
                    api: '/manyBuildingIn',
                    type: 2
                }
                options.params = this.searchKey ? {select:this.searchKey} : ''
                this.$ajax(options, (response) => {
                    this.buildData = response
                    this.mapFn()
                })
            },
            mapFn(isAlarm){
                const data = this.buildData
                const centerLong = (data.DisplayArea.maxLongitude + data.DisplayArea.minLongitude) / 2;
                const centerLat = (data.DisplayArea.maxLatitude + data.DisplayArea.minLatitude) / 2;
                const map = new AMap.Map('section_many', {
                    zoom: 10,
                    center: [centerLong, centerLat]
                });
                const markers = [];
                data.datas.forEach((item) => {
                    markers.push([item.longitude, item.latitude])
                })
                this.map = map
                this.mapReset(isAlarm)
            },
            mapReset(isAlarm){
                const map = this.map
                if(isAlarm){map.clearMap()}
                const infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
                const data = this.buildData

                data.datas.forEach((item, index) => {
                    let marker;
                    if(!isAlarm){
                        marker = new AMap.Marker({
                            position: [item.longitude, item.latitude],
                            map: map
                        })
                        this.alarmData = []
                    }
                    this.alarmData.forEach((obj)=>{
                        if(obj.bInfo.systemNum == item.systemNum){
                            const total = obj.alarm.value * 5
                            const color = this.colorRgb(obj.alarm.colour)
                            const _contents = '<div class="mapPoints" style="width:'+total+'px;height:'+total+'px;background:radial-gradient(rgba(' + color + ',0) 0%,rgba(' + color + ',0) 50%,rgba(' + color + ',1) 100%);"><span style="background-color:rgb(' + color + ')"></span><i style="background-color:rgb(' + color + ')"></i></div>';
                            marker = new AMap.Marker({
                                content:_contents,
                                position: [obj.bInfo.longitude, obj.bInfo.latitude],
                                map: map
                            })
                        }
                    })
                    // marker.content = '<h3>' + data.datas[index].buildingName + '</h3><div>地址：' + data.datas[index].buildingAddress + '<br>电话：' + data.datas[index].phone + '</div>';
                    marker.on('click', function (e) {
                        localStorage.setItem('systemNum',item.systemNum)
                        window.open('/cas/index.html')
                    });
                })
                map.setFitView();

            },
            toFixedFn(value) {
                return Number(value).toFixed(2)
            },
            orderFn(item) {
                const data = JSON.parse(JSON.stringify(item))
                const arr = data.sort(this.$utils.compare('count', false))
                this.orderGisCountData = arr.slice(0, 4)
            }
        }
    }
</script>

<style lang="scss">

</style>
