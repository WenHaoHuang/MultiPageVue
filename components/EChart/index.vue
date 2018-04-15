<template>
    <IEcharts :option="options" :loading="loading" @ready="onReady"></IEcharts>
</template>

<script>
    import IEcharts from 'vue-echarts-v3/src/full.js'

    export default {
        name: "EChart",
        components:{
            IEcharts
        },
        props:{
            isLoading:{
                type:Boolean,
                default:true
            },
            options:{}
        },
        data(){
            return {
                loading:true,
            }
        },
        methods:{
            onReady(instance){
                this.loading = false
            }
        }
    }
</script>

<style lang="scss">

</style>
