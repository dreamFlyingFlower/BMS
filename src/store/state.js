import common from '@/utils/common';

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