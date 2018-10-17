/**
 * 对每个页面的跳转进行校验,若无权限则不跳转
 */
import router from './index';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import common from '../utils/common';
import apiRole from '@/api/role';
import {Message} from "element-ui";

NProgress.configure({
  showSpinner: false
});

router.beforeEach((to, from, next) => {
  NProgress.start();
  // 不需要通过校验的页面,直接跳
  if (process.env.WHITE_LIST.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
    next();
  }else{
    let token = common.getSession("SET_TOKEN");
    if (token && token !== "undefined") {
      if(from.path === "/login"){
        // 如果是从login跳过来的,则请求菜单数据
        apiRole.getRoleMenu({roleId:(common.getSession("SET_ROLES")[0]).roleId}).then(resp=>{
          if(resp === undefined){
            Message({
              message: "this role has no menus",
              type: 'error',
              duration: 3000
            });
            return;
          }
          common.setSession("SET_MENUS",resp.data[0].children)
          next();
        });
      }else if (!common.getSession("SET_MENUS")) {
        // 权限菜单失效,跳到登录界面,不重新请求,带上要去的地方
        next({path:"/login",query:{referrer:to.fullPath}});
      } else {
        // 从session中检验菜单权限
        if (!common.isBlank(hasMenu(to.path))) {
          next();
        } else {
          next({path: '/401',replace: true,query: { noGoBack: true}});
        }
      }
    } else {
      next(`/login?redirect=${to.path}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
})

// 循环菜单判断是否有进入权限
function hasMenu(des) {
  let roles = common.getSession("SET_ROLES");
  if(common.isNotBlank(roles)){
    if(roles.some(role=>role.roleState === 0)){
      return true;
    }else{
      let menus = common.getSession("SET_MENUS")[0];
      return hasMenus(menus.children,des);
    }
  }
  return false;
}

// 递归循环是否能进入菜单
let flag = false;
function hasMenus(vals,des){
  if(common.isBlank(vals)){
    return;
  }
  if(!flag){
    for(let val of vals){
      if(val.menuUrl.indexOf(des) > -1){
        flag = true;
      }else{
        hasMenus(val.children,des);
      }
    }
  }
  return flag;
}

router.afterEach(() => {
  NProgress.done()
});