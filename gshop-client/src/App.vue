<template>
<div id="app">
  <router-view></router-view>
  <footer-gitde></footer-gitde>
</div>
</template>

<script>
  import './mock/mockjs';
  import footerGitde from './components/footerGitde/footerGitde';
  export default {
    name: 'App',
    components:{
      footerGitde
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
