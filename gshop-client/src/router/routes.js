import msite from '../pages/Msite/msite';
import order from '../pages/order/order';
import profile from '../pages/profile/profile';
import search from '../pages/search/search';
import login from '../pages/login/login';
import shop from '../pages/shop/shop';

import goods from '../pages/shop/goods/goods/goods';
import info from '../pages/shop/goods/info/info';
import ratings from '../pages/shop/goods/ratings/ratings';
export default [
  {path:'/msite',component:msite,meta:{a:true}},
  {path:'/order',component:order,meta:{a:true}},
  {path:'/profile',component:profile,meta:{a:true}},
  {path:'/search',component:search,meta:{a:true}},
  {path:'/login',component:login},
  {
    path:'/shop',
    component:shop,
    children:[
      {path:'goods',component:goods},
      {path:'info',component:info},
      {path:'ratings',component:ratings},
      {path:'',redirect: 'goods'}
    ]
  },
  {path:'/',redirect:'/msite'}
]
