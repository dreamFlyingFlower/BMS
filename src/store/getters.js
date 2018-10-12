// jshint esversion:6
// jshint node:true
export default {
  user: state => state.user,
  roles: state => state.role,
  departs: state => state.departs,
  token: state => state.token,
  menus: state => state.menus,
  buttons :state => state.buttons,
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs
}