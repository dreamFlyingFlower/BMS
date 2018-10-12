//jshint esversion:6
//jshint node:true
import service from '@/utils/service';

export default {
  login,
  logout
};

function login(params) {
  return service({
    url: '/user/login',
    method: 'get',
    params
  });
}

function logout() {
  return service({
    url: '/login/logout',
    method: 'post'
  });
}