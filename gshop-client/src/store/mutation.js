import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS
} from './mutation-types';

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

}
export default mutations
