/*
包含n个接口请求函数的模块
每个函数的返回值是promise
 */
import ajax from './ajax';
// const BASE = 'http://localhost:5000'
const BASE = '/api'

// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = (longitude, latitude) => ajax(BASE + `/position/${latitude},${longitude}`)

// [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqFoodCategorys = () => ajax(BASE + '/index_category')

// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops = (longitude, latitude) => {
 return ajax(BASE + '/shops', {latitude, longitude})
}
// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
// [5、获取一次性验证码](#5获取一次性验证码)图片验证码<br/>
          //页面直接发请求
// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqPwdLogin = ({name,code,captcha})=> ajax(BASE+'/login_pwd',{name,code,captcha},'POST')
// [7、发送短信验证码](#7发送短信验证码)<br/>
export const reqSmsCode =(phone) => ajax(BASE+'/sendcode',{phone})
// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqSmsLogin = ({phone,code}) => ajax(BASE+'/login_sms',{phone,code},'POST')
// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
// [10、用户登出](#10用户登出)<br/>
export const reqLonOut = ()=> ajax(BASE+'/logout')
//获取mock数据的请求
export const reqGoods = ()=> ajax('/goods')//获取商家 商品列表
export const reqInfo = ()=> ajax('/info')//获取商家 信息
export const reqRatings =  ()=> ajax('/ratings')//获取商家评价数组


