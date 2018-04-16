<template>
    <article id="pages" class="pages">
        <head-bar></head-bar>
        <section class="main-page">
            <side-menu></side-menu>
            <div class="wrapper">
                <div class="wrapper-header">
                    <div class="breadcrumb-bar">
                        <div class="page-title">{{$route.meta.title}}</div>
                        <div class="breadcrumb">
                            <div class="item">{{menuName}}</div>
                            <div class="current">{{$route.meta.title}}</div>
                        </div>
                    </div>
                    <div class="search">
                        <input type="text" v-model="searchKey" placeholder="搜索楼宇" class="search-bar">
                        <div class="btn-search" @click="searchFn"></div>
                    </div>
                </div>
                <div class="wrapper-main">
                    <transition name="fade">
                        <router-view ref="page"/>
                    </transition>
                </div>
            </div>
        </section>
    </article>
</template>

<script>
    import headBar from 'components/headBar'
    import sideMenu from 'components/sideMenu'

    export default {
        name: "pages",
        components: {
            headBar, sideMenu
        },
        data(){
            return {
                searchKey:'',
                menuName:''
            }
        },
        mounted(){
            this.pageNameFn()
        },
        watch:{
            '$route'(to){
                this.pageNameFn()
            }
        },
        methods:{
            pageNameFn(){
                const route = this.$route
                const menuName = {
                    'alarm':'告警管理',
                    'video':'视频管理',
                    'inspect':'巡检管理',
                    'info':'信息管理',
                }
                const parentRoute = route.path.split('/')[1]
                this.menuName = menuName[parentRoute]
                this.searchKey = ''
            },
            searchFn(){
                this.$refs.page.getData(this.searchKey)
            }
        }
    }
</script>

<style lang="scss">
</style>
