import apiUser from '@/api/user';
import apiRole from '@/api/role';
import common from '@/utils/common';

export default {
  /**
   * 获得用户的基本信息,存入session,防止页面刷新,存入store是为了vue环境刷新
   */
  GetUserInfo({commit},params){
    return new Promise((resolve,reject)=>{
      apiUser.login(params).then(resp=>{
        if(resp !== undefined){
          let data = resp.data;
          common.setSession("SET_USER",data);
          common.setSession('SET_ROLES', data.roles);
          common.setSession('SET_TOKEN', data.token);
          commit("SET_USER",data);
          commit("SET_ROLES",data.roles);
          commit("SET_TOKEN",data.token);
          resolve(resp);
        }else{
          reject(resp);
        }
      });
    });
  },
  ClearUserInfo({commit}){
    commit("SET_USER",null);
    commit("SET_ROLES",null);
    commit("SET_DEPARTS",null);
    commit("SET_MENUS",null);
    commit("SET_BUTTONS",null);
    commit("SET_TOKEN",'');
  },
  // 获取角色权限菜单
  GetRoleMenu() {
    return new Promise((resolve, reject) => {
      apiRole.getRoleMenu({roleId: common.getSession("SET_ROLES")[0].roleId}).then(response => {
        let data = response.data;
        if (data[0].children && data[0].children.length) {
          common.setSession("SET_MENUS", data[0].children);
        } else {
          reject(response);
        }
        resolve(response);
      });
    });
  },

  // 第三方验证登录
  // LoginByThirdparty({ commit, state }, code) {
  //   return new Promise((resolve, reject) => {
  //     commit('SET_CODE', code)
  //     loginByThirdparty(state.status, state.email, state.code).then(response => {
  //       commit('SET_TOKEN', response.data.token)
  //       setToken(response.data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // 登出
  LogOut({ commit, state }) {
    return new Promise((resolve, reject) => {
      apiUser.logout(state.token).then(() => {
        sessionStorage.clear();
        localStorage.clear();
        commit('SET_TOKEN', '')
        commit('SET_MENUS', [])
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // 前端 登出
  FedLogOut({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      removeToken()
      resolve()
    })
  },

  // 动态修改权限
  ChangeRoles({commit}, role) {
    return new Promise(resolve => {
      commit('SET_TOKEN', role)
      setToken(role)
      getRoleMenu(role).then(response => {
        const data = response.data
        commit('SET_MENUS', data[0].children)
        commit('SET_NAME', data.name)
        resolve()
      })
    })
  },

  ToggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  CloseSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
    }
}