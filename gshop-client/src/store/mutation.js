import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-types';

const mutations={
  [RECEIVE_ADDRESS](store,{address}){
    store.address=address;
  },
  [RECEIVE_CATEGORYS](store,{categorys}){
    store.categorys=categorys;
  },
  [RECEIVE_SHOPS](store,{shops}){
    store.shops=shops;
  }
}
export default mutations
