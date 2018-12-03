import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types';
import Vue from 'vue';
const mutations={
  [RECEIVE_ADDRESS](state,{address}){
    state.address=address;
  },
  [RECEIVE_CATEGORYS](state,{categorys}){
    state.categorys=categorys;
  },
  [RECEIVE_SHOPS](state,{shops}){
    state.shops=shops;
  },
  [RECEIVE_USER](state,user){
    state.user=user;
  },
  [RECEIVE_INFO](state, {info}) {
    state.info = info
  },
  [RECEIVE_RATINGS](state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, {goods}) {
    state.goods = goods
  },
  [INCREMENT_FOOD_COUNT](state, {food}) {
    if(!food.count) {
      Vue.set(food, 'count', 1) // 有数据绑定
      state.cartFoods.push(food)
    } else {
      // 否则直接加1
      food.count++
    }
  },

  [DECREMENT_FOOD_COUNT](state, {food}) {
    if(food.count>0) {
      food.count--//从购物车中减少一个, 满足条件删除
      if(food.count===0) {
        state.cartFoods.splice(state.cartFoods.indexOf(food), 1)
      }
    }
  },

  [CLEAR_CART](state) {
    // 将购物车中所有food的count置为0
    state.cartFoods.forEach(food => food.count = 0)
    // 清空购物车数组
    state.cartFoods = []
  },
}
export default mutations
