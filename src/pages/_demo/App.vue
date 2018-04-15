<template>
  <div id="app">
    this is demo index.html<br>{{con}}
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      con:'demo page2'
    }
  },
  created(){
    console.log('hahahahahahahaha');
    this.$msg('del')
    this.$alert('alert')
  }
}
</script>

<style lang="scss">
  @import "~assets/css/style";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .hello{
    padding:10px;
  }
}
</style>
