import cookie from 'js-cookie';
import encrypt from './encrypt';
import { debug } from 'util';

const TokenKey = 'Admin-Token';

export default{
  isBlank,
  isNotBlank,
  setToken,
  getToken,
  setSession,
  getSession,
  setCookie,
  getCookie,
  removeCookie
}

function isBlank(val){
  return !val || val === undefined || val === "undefined";
}

function isNotBlank(val){
  return !isBlank(val);
}

/**
 * 登录的时候设置token,若登录接口不返回验证的token,则需要生成一个标志token
 * store刷新整个页面会刷掉所有内存中存的状态管理,需要一个标志位来判断是否仍在登陆状态
 */
function setToken(val){
  debugger
  val = isBlank(val) ? TokenKey : val;
  sessionStorage.setItem(TokenKey,encrypt.base64Encode(val));
}

function getToken(){
  return encrypt.base64Decode(sessionStorage.getItem(TokenKey));
}

function setSession(key,val){
  if(!typeof key === "string"){
    console.log("key only string type");
    return;
  }
  if(typeof val === "object"){
    sessionStorage.setItem(key,encrypt.base64Encode(JSON.stringify(val)));
  }else{
    sessionStorage.setItem(key,encrypt.base64Encode(val));
  }
}

function getSession(key){
  try {
    return JSON.parse(encrypt.base64Decode(sessionStorage.getItem(key)));
  } catch (error) {
    return encrypt.base64Decode(sessionStorage.getItem(key));
  }
}

/**
 * 只在需要限时的环境中使用cookie,浏览器关闭cookie不会消失
 */
function setCookie(key,val){
  cookie.set(key,val);
}

function getCookie(key){
  return cookie.get(key);
}

function removeCookie(key){
  cookie.remove(key);
}