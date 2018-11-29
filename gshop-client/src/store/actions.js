import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types';

import {
  reqAddress,
  reqFoodCategorys,
  reqShops
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
  //商品列表
  async getCategorys({commit}){
    //ajax获取数据
    let result =await reqFoodCategorys();
    if (!(result.code)) {
      let categorys=result.data;
      commit(RECEIVE_CATEGORYS,{categorys});
    }
  },
  //获取用户列表
  async getShops({commit,state}){
    //ajax获取数据
    let result =await reqShops(state.longitude,state.latitude);
    if (!(result.code)) {
      let shops=result.data;
      commit(RECEIVE_SHOPS,{shops});
    }
  },

}
export default actions
