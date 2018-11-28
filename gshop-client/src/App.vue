<template>
<div id="app">
  <router-view></router-view>
  <footer-gitde></footer-gitde>
</div>
</template>

<script>
  import footerGitde from './components/footerGitde/footerGitde';
  export default {
    name: 'App',
    components:{
      footerGitde
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
