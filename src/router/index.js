import Vue from 'vue';
import Router from 'vue-router';
import home from '@/views/home';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect:"login"
    },
    {
      path:'/login',
      name:'login',
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
      name:"user",
      redirect:"user/register",
      component:home,
      meta:{title:"user"},
      children:[
        {
          path:'/userInfo',
          name:'userInfo',
          component:()=>import('@/views/user/userInfo'),
          meta:{'title':'userInfo'}
        },
        {
          path:"register",
          name:"register",
          component:()=>import("@/views/user/register"),
          meta:{title:"register"}
        }
      ]
    },
    {
      path:'/system',
      name:'system',
      redirect:"/system/user",
      component:()=>import('@/views/system/index'),
      meta:{'title':'system'},
      children:[
        {
          path:'user',
          name:'sysUser',
          component:()=>import('@/views/system/user'),
          meta:{'title':'user'}
        },
        {
          path:'role',
          name:'sysRole',
          component:()=>import('@/views/system/role'),
          meta:{'title':'role'}
        },
        {
          path:'menu',
          name:'sysMenu',
          component:()=>import('@/views/system/menu'),
          meta:{'title':'menu'}
        },
        {
          path:'button',
          name:'sysButton',
          component:()=>import('@/views/system/button'),
          meta:{'title':'button'}
        }
      ]
    }
  ]
})