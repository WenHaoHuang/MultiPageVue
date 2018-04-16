<template>
    <div class="container">
        <div class="section-list mt40">
            <div class="item-cell flex flex-justify-between flex-align-center text-center" v-for="item in listData" :key="item.id">
                <div class="item flex-bd text-left">{{item.floorName}}</div>
                <div class="item flex-bd">{{item.alarmValue}}</div>
                <div class="item flex-bd item-postion">{{item.postion}}</div>
                <!--<div class="item flex-bd">{{item.sensortype}}</div>-->
                <div class="item flex-bd text-right">{{item.sensortype}} {{item.state}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                listData:[]
            }
        },
        mounted(){
            this.getData()
        },
        methods:{
            getData(key) {
                const options = {
                    api: '/gis/gisCurrentAlarmList',
                    type: 2
                }
                options.params = key ? {likeBName: key} : ''
                this.$ajax(options, (response) => {
                    this.listData = response.data
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .section-list{
        background-color: #263056;
        .item-cell{
            color:#FBFF03;
            padding:0.2rem;
            .item-postion{
                flex:2;
            }
            &:nth-child(2n){
                background-color: #222547;
            }
        }
    }
</style>
