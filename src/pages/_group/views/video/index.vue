<template>
    <div class="container">
        <div class="section-head mt30 flex flex-justify-between flex-align-center">
            <div class="item-head text-center" v-for="item in baseData" :key="item.id">
                <div class="item-hd">{{item.type}}</div>
                <div class="item-desc text-danger">{{item.count}}</div>
            </div>
        </div>
        <div class="section-body mt20" v-for="item in extendData" :key="item.id">
            <div class="list-info flex">
                <div class="item-body" v-for="list in item.list" :key="list.id">
                    <div class="item-name">{{list.cctvName}}</div>
                    <a :href="list.link" target="_blank" class="item-thumb">
                        <img :src="list.picUrl" alt="" class="img-responsive">
                    </a>
                </div>
            </div>
            <div class="item-bname mt40">{{item.bInfo.bName}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
            return {
                baseData:[],
                extendData:[]
            }
        },
        mounted(){
            this.getGisAlarmLvData()
            this.getData()
        },
        methods:{
            getGisAlarmLvData(){
                this.$ajax({
                    api:'/gis/gisVideoTypeCount',
                    type:2
                },(response)=>{
                    this.baseData = response.data
                })
            },
            getData(key) {
                const options = {
                    api: '/gis/gisCctvList',
                    type: 2
                }
                options.params = key ? {likeBName: key} : ''
                this.$ajax(options, (response) => {
                    this.extendData = response.data
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.section-head{
    .item-head{
        margin-right:0.2rem;
        flex:1;
        background-color: #262C42;
        padding:0.2rem;
        .item-desc{
            font-size:0.6rem;
        }
        &:last-child{
            margin-right:0;
        }
    }
}
.section-body{
    background-color: #262C42;
    padding:0.2rem;
    .list-info{
        flex-wrap:wrap;
    }
    .item-body{
        width:4rem;
        margin-right:0.2rem;
        margin-bottom:0.2rem;
        .item-thumb{
            display:block;
            width:4rem;
            height:3rem;
            background-color: #000;
            display:flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
        }
    }
    &:last-child{
        margin-right:0;
    }
    .item-bname{
        height:1.28rem;
        background:transparent url("~assets/img/bg_buiding.png") scroll left center no-repeat;
        background-size:auto 100%;
        padding-left:1.5rem;
        font-size:0.4rem;
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    }
}
</style>
