export default {
  SET_USER(state, user) {
    state.user = user;
  },
  SET_ROLES(state, roles) {
    state.roles = roles;
  },
  SET_DEPARTS(state,departs){
    state.departs = departs;
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus;
  },
  SET_BUTTONS:(state,buttons) => {
    state.buttons = buttons;
  }
}