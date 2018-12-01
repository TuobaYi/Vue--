import Mock from 'mockjs';
import data from './data.json';
const {info,ratings,goods} = data;
Mock.mock('/info',{code:0,data:info});
Mock.mock('/ratings',{code:0,data:ratings});
Mock.mock('/goods',{code:0,data:goods});
