<template>
    <article id="main-login">
        <div class="login-box">
            <div class="cells item-logo">
                <img src="~assets/img/logo.png" class="img-responsive">
            </div>
            <div class="mt20">
                <input type="text" class="text" placeholder="请输入您的用户名" v-model="userName">
            </div>
            <div class="mt20">
                <input type="text" class="text" placeholder="请输入您的密码" v-model="password" onfocus="this.type='password'">
            </div>
            <div class="mt20 section-orglist">
                <input type="text" class="text" placeholder="请输入机构" v-model="orgDesc" @focus="orgFocus" @blur="orgBlur">
                <div class="list-org" v-show="orgShow">
                    <div class="item" v-for="item in conditions(orgList)" :key="item.id" @click="selectFn(item)">{{item.orgId}}（{{item.orgName}}）</div>
                </div>
            </div>
            <div class="mt20">
                <div class="btn btn-primary btn-lg btn-md" @click="loginFn">登录</div>
            </div>
            <div class="mt20 text-center text-xs">
                CopyRight © 2018&nbsp;&nbsp;
                <a href="http://www.miitbeian.gov.cn/" target="_blank">沪ICP备16049830号</a></div>
        </div>
    </article>
</template>

<script>
    export default {
        name: "login",
        data(){
            return {
                orgList:[],
                userName:'',
                password:'',
                orgId:'',
                orgDesc:'',
                orgShow:false
            }
        },
        mounted(){
            this.getListOrg()
        },
        methods:{
            getListOrg(){
                this.$ajax({
                    api:'listOrg'
                },(response)=>{
                    this.orgList = response.list
                })
            },
            selectFn(item){
                this.orgId = item.orgId;
                this.orgDesc = `${item.orgId}（${item.orgName}）`
            },
            conditions(items){
                if(this.orgDesc){
                    const searchRegex = new RegExp(this.orgDesc,'i')
                    return items.filter((item)=>{
                        return searchRegex.test(item.orgId) || searchRegex.test(item.orgName)
                    })
                } else {
                    return items
                }
            },
            orgFocus(){
                this.orgShow = true
            },
            orgBlur(){
                setTimeout(()=>{
                    this.orgShow = false
                },200)
            },
            loginFn(){
                this.$login({
                    userLogin:this.userName + "@" + this.orgId,
                    password:this.password
                },()=>{
                    localStorage.setItem("orgId",this.orgId);
                    this.$router.push({
                        name:'index'
                    })
                })
            }
        }
    }
</script>

<style lang="scss">
#main-index{
    position:relative;
    width:100%;height:100%;
    overflow-y:auto;
    -webkit-overflow-scrolling: touch;
}
</style>
