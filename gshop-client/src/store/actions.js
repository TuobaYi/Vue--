import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_RATINGS,
  RECEIVE_INFO,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART
} from './mutation-types';

import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqGoods,
  reqInfo,
  reqRatings
} from '../api';
const actions={
  //根据经纬度获取地址信息,提交mutation
  async getAddress({commit,state}){
    //ajax获取数据
    let result =await reqAddress(state.longitude, state.latitude);
    if (!(result.code)) {
      let address=result.data;
      commit(RECEIVE_ADDRESS,address);
    }
  },
  //商品列表轮播图用
  async getCategorys({commit}){
    //ajax获取数据
    let result =await reqFoodCategorys();
    if (!(result.code)) {
      let categorys=result.data;
      commit(RECEIVE_CATEGORYS,{categorys});
    }
  },
  //获取用户列表 显示的商户信息
  async getShops({commit,state}){
    //ajax获取数据
    let result =await reqShops(state.longitude,state.latitude);
    if (!(result.code)) {
      let shops=result.data;
      commit(RECEIVE_SHOPS,{shops});
    }
  },


//更新user状态数据 登录使用
  updataUser({commit},user){
    commit(RECEIVE_USER,user);
  },


  // 异步获取商家信息
  async getShopInfo({commit}) {
    const result = await reqInfo()
    if(result.code===0) {
      const info = result.data
      info.score = 3.5
      commit(RECEIVE_INFO, {info})
    }
  },

// 异步获取商家评价列表
  async getShopRatings({commit}, cb) {
    const result = await reqRatings()
    if(result.code===0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
     typeof cb==='function' && cb()
    }
  },

// 异步获取商家商品列表
  async getShopGoods({commit},callback) {
    const result = await reqGoods()
    if(result.code===0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      typeof callback==='function' && callback()
      // 如果组件中传递了接收消息的回调函数, 数据更新后, 调用回调通知调用的组件
    }
  },
  //同步统计购物车 数量
  updateFoodCount ({commit}, {isAdd, food}) {
    if(isAdd) {
      commit(INCREMENT_FOOD_COUNT, {food})
    } else {
      commit(DECREMENT_FOOD_COUNT, {food})
    }
  },
  // 清空购物车数据
  clearCart ({commit}) {
    commit(CLEAR_CART)
  }
}
export default actions
