<template>
  <section class="msite">
  <!--首页头部-->
  <top-header class="msite_header" :msg="address">
     <span class="header_search" slot="left">
       <i class="iconfont icon-sousuo"></i>
    </span>
    <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
    </span>
  </top-header>
  <!--首页导航 轮播效果-->
  <nav class="msite_nav">
    <div class="swiper-container" v-if="categorysArr.length>0">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(cs,index) in categorysArr" :key="index">
          <a href="javascript:" class="link_to_food" v-for="(c,index) in cs" :key="index">
            <div class="food_container">
              <img :src="'https://fuss10.elemecdn.com'+c.image_url">
            </div>
            <span>甜品饮品</span>
          </a>

        </div>
      </div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>
    <img src="./images/msite_back.svg" alt="" v-else>
  </nav>
  <!--首页附近商家-->
  <shop-list></shop-list>
</section>
</template>

<script>
import topHeader from '../../components/topHeader/topHeader';
import shopList from '../../components/shopList/shopList';
import {mapState} from 'vuex'
import 'swiper/dist/css/swiper.min.css';
import Swiper from 'swiper';
  export default {
    name: 'Msite',
    mounted(){//挂载完成请求数据
      this.$store.dispatch('getAddress');
      this.$store.dispatch('getShops');
      this.$store.dispatch('getCategorys');
    },
    watch:{
      categorys(){
        this.$nextTick(()=>{
          new Swiper('.swiper-container',{
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },

          })
        })
      },//监听数据,实现轮播
    },
    computed:{
      ...mapState(['address','categorys']),
      categorysArr(){
        let bigArr=[];//二维数组
        let minArr=[];//一维小数组(长度为8)
        const {categorys}=this //获取状态数据中的商品列表(改造成二维数组,轮播)
        categorys.forEach(c=>{
          minArr.push(c);
          if (minArr.length===8){
            bigArr.push(minArr);
            minArr=[];
          }
        })
        return bigArr
      },//二维数组轮播

    },
    components:{
      topHeader,
      shopList
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/minixs.styl'
  .msite  //首页
    width 100%
    .msite_header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774

</style>
