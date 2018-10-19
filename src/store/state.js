import common from '@/utils/common';

/**
 * 此处从session中获得数据是因为页面整体刷新的时候,store中存在的信息将全部消除
 * 但是第一次加载的时候,store的加载在session的获取之前,所有都为空,第一次不仅需要将信息存入session,还要存入store
 */
export default {
  // 用户信息
  user: common.getSession("SET_USER"),
  token:common.getToken(),
  roles: common.getSession("SET_ROLES"),
  departs:common.getSession("SET_DEPARTS"),
  menus: common.getSession("SET_MENUS"),
  buttons:common.getSession("SET_BUTTONS"),
  // 导航栏信息
  
}