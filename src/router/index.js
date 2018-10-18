import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home';

Vue.use(Router);

/**
 * vue的目录跳转,除了重定向的之后都要写meta,并且meta里要写title,用来国际化语言,不然会有页面显示错误
 * 所有的name都以大写开头,component都以大写开头,其他驼峰
 */
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect:"login"
    },
    {
      path:'/login',
      name:'Login',
      component:()=>import('@/views/user/login'),
      meta:{'title':'login'}
    },
    {
      path:'/401',
      name:'401',
      component:()=>import('@/views/error/401'),
      meta:{'title':'401'}
    },
    {
      path:'/404',
      name:'404',
      component:()=>import('@/views/error/404'),
      meta:{'title':'404'}
    },
    {
      path:"user",
      name:"User",
      redirect:"user/register",
      component:Home,
      meta:{title:"user"},
      children:[
        {
          path:'/userInfo',
          name:'UserInfo',
          component:()=>import('@/views/user/userInfo'),
          meta:{'title':'userInfo'}
        },
        {
          path:"register",
          name:"Register",
          component:()=>import("@/views/user/register"),
          meta:{title:"register"}
        }
      ]
    },
    {
      path:'/system',
      name:'System',
      redirect:"/system/user",
      component:Home,
      meta:{'title':'sysSetting'},
      children:[
        {
          path:'user',
          name:'SysUser',
          component:()=>import('@/views/system/user'),
          meta:{'title':'userSetting'}
        },
        {
          path:'role',
          name:'SysRole',
          component:()=>import('@/views/system/role'),
          meta:{'title':'roleSetting'}
        },
        {
          path:'menu',
          name:'SysMenu',
          component:()=>import('@/views/system/menu'),
          meta:{'title':'menuSetting'}
        },
        {
          path:'button',
          name:'SysButton',
          component:()=>import('@/views/system/button'),
          meta:{'title':'buttonSetting'}
        }
      ]
    },
    {
      path:"",
      component:Home,
      children:[
        {
          path:"book",
          name:"Book",
          component:()=>import("@/views/book"),
          meta:{title:"book"}
        }
      ]
    }
  ]
})