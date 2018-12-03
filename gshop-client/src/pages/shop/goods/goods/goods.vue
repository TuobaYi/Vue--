<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUl">
          <!--left导航 现在选中的特定样式 .current-->
          <li class="menu-item " v-for="(good, index) in goods" :key="index"
              :class="{current:currentIndex===index}"
              @click="handleChoose(index)">
            <span class="text bottom-border-1px">
              <img class="icon" v-show="good.icon" :src="good.icon">
              {{good.name}}</span>
          </li>
        </ul>
      </div>
      <div class="foods-wrapper">
        <ul ref="foodsUl">
          <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px"
                  v-for="(food,index) in good.foods"
                  :key="index"
                  @click="showFood(food)">
                <div class="icon">
                  <img width="57" height="57"
                       :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <cart-control :food="food"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <shop-cart></shop-cart>
    </div>
    <food :food="food" ref="food"></food>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import BScroll from 'better-scroll';
  import cartControl from '../../../../components/cartControl/cartControl';
  import shopCart from '../../../../components/shopCart/shopCart';
  import food from '../../../../components/food/food';
  export default {
    name: 'goods',
    data(){
      return {
        food: {}, // 需要显示的food
        scrollY: 0, // 右侧列表滑动的Y轴坐标
        tops: [], // 右侧列表中所有分类li的top值
      }
    },
    computed:{
      ...mapState(['goods']),
      currentIndex(){
        const {scrollY, tops} = this;
        // 得到当前分类的下标
        const index = tops.findIndex((top, index) => {
          return scrollY>=top && scrollY<tops[index+1]
        })
        // 如果发生了变化, 让左侧列表滚动到index对应的li处
        if(index!==this.index && this.leftScroll) { //保存一个index,在this中
          this.index = index
          this.leftScroll.scrollToElement(this.$refs.leftUl.children[index], 300)
        }
        return index
      }
    },
    mounted(){
      this.$store.dispatch('getShopGoods',()=>{
        this.$nextTick(()=>{
          this._initScroll()//两个滑动
          this._initTops();//为tops赋值
        })
      })

    },

    methods:{
      handleChoose(index){
        const y = this.tops[index]
        // 立即更新scrollY为目标坐标
        this.scrollY = y
        // 让右侧滑动到对应的位置
        this.rightScroll.scrollTo(0, -y, 300)
      },
      // 组件标签对象就是组件对象
      showFood(food) {
        // 1. 更新food状态数据
        this.food = food
        // 2. 显示food组件界面
        this.$refs.food.toggleShow()
      },
      _initScroll(){
        this.leftScroll = new BScroll('.menu-wrapper',{//left 滑动
          click:true
        })
        this.rightScroll =new BScroll('.foods-wrapper',{
          click:true,
          probeType: 1,  // 触摸, 非实时
          // probeType: 2,  // 触摸, 实时
          // probeType: 3,  // 触摸/惯性/编码, 实时
        })
        // 绑定滚动的事件监听
        this.rightScroll.on('scroll', ({x, y}) => {
          this.scrollY = Math.abs(y)//存储右侧滚动 y
        })
        // 绑定滚动结束的事件监听
        this.rightScroll.on('scrollEnd', ({x, y}) => {
          // 更新scrollY
          this.scrollY = Math.abs(y)
        })
      },
      _initTops(){
        const tops=[];
        let top = 0;
        tops.push(top);
        const lis = this.$refs.foodsUl.getElementsByClassName('food-list-hook');
        [].slice.call(lis).forEach(li => {
          top += li.clientHeight
          tops.push(top)
        })
        this.tops=tops
      }
    },
    components:{
      cartControl,
      shopCart,
      food
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../../common/stylus/minixs.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>




