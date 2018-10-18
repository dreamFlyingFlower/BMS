//jshint esversion:6
//jshint node:true
import service from '@/utils/service';

export default {
  login,
  logout,
  getPages
};

function login(params) {
  return service({
    url: '/user/login',
    method: 'get',
    params
  });
}

function logout(params) {
  return service({
    url: `/user/logout/${params.userId}`,
    method: 'get'
  });
}

function getPages(params){
  return service({
    url:"/user/getPages",
    params
  });
}