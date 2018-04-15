<template>
    <article class="section-menu">
        <div class="menu-list" v-for="route in routes" :key="route.id" v-if="!route.meta.hidden" :class="{'index':route.name == 'index','active':route.isCur}">
            <router-link :to="{name:route.name}" v-if="route.name == 'index'" class="menu-index"><span>{{route.meta.title}}</span></router-link>
            <div class="item-menu" v-else @click="selectMenu(route)">
                <div class="item_hd">{{route.meta.title}}</div>
                <div class="item_bd">
                    <router-link :to="{name:item.name}" class="item" :class="{'current':$route.name == item.name}" v-for="item in route.children" :key="item.id">{{item.meta.title}}</router-link>
                </div>
            </div>
        </div>
    </article>
</template>

<script>
    export default {
        name: "index",
        data(){
            return{
                routes:[]
            }
        },
        mounted(){
            this.routes = this.$router.options.routes
            this.initMenu()
        },
        methods:{
            initMenu(){
                const route = this.routes
                const pageName = this.$route.name
                route.forEach((item,index)=>{
                    this.$set(this.routes[index],'isCur',false)
                    if(item.children){
                        item.children.forEach((child)=>{
                            if(child.name == pageName){
                                this.$set(this.routes[index],'isCur',true)
                            }
                        })
                    }
                })
            },
            selectMenu(item){
                this.routes.forEach((route)=>{
                    if(route.isCur){
                        route.isCur = false
                    }
                })
                this.$set(item,'isCur',true)
            }
        }
    }
</script>

<style lang="scss">
 @import "./index.scss";
</style>
