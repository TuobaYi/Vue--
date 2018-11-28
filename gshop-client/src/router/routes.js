import msite from '../pages/Msite/msite';
import order from '../pages/order/order';
import profile from '../pages/profile/profile';
import search from '../pages/search/search';
import login from '../pages/login/login';

export default [
  {path:'/msite',component:msite},
  {path:'/order',component:order},
  {path:'/profile',component:profile},
  {path:'/search',component:search},
  {path:'/login',component:login},
  {path:'/',redirect:'/msite'}
]
