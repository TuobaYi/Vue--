import msite from '../pages/Msite/msite';
import order from '../pages/order/order';
import profile from '../pages/profile/profile';
import search from '../pages/search/search';
import login from '../pages/login/login';

export default [
  {path:'/msite',component:msite,meta:{a:true}},
  {path:'/order',component:order,meta:{a:true}},
  {path:'/profile',component:profile,meta:{a:true}},
  {path:'/search',component:search,meta:{a:true}},
  {path:'/login',component:login},
  {path:'/',redirect:'/msite'}
]
