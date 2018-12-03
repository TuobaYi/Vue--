<template>
  <div class="star" :class="`star-${size}`">
    <span class="star-item " v-for="(c,index) in arrClass" :key="index" :class="c"></span>
 <!--   <span class="star-item on"></span>
    <span class="star-item on"></span>
    <span class="star-item half"></span>
    <span class="star-item off"></span>-->
  </div>
</template>
//off2 half1
<script>
  export default {
    name: 'stars',
    computed:{
      arrClass(){
        let classList=[];//遍历这个数组产生span和对应的class
        let intRating=Math.floor(this.rating);
        for (let i = 0; i < intRating; i++) {
          classList.push("on")
        }
        if (this.rating*10-intRating*10>5){
          classList.push('half')
        }
        while(classList.length<5){
          classList.push('off')
        }
        return classList
      }
    },
    props:{
      rating:Number,
      size:String
    }
  }
</script>

<style scoped lang="stylus">
  @import '../../common/stylus/minixs.styl'
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>
