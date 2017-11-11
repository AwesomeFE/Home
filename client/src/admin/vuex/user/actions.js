import * as UserService from '../../services/UserService';

export const actions = {
  // 用户api
  async getSession({ commit, state }) {
    const { data, type } = await UserService.getSessionUser();
    commit('setLoginUser', data);

    return type;
  },

  async login({ commit, state }, passport) {
    const { data, type } = await UserService.login(passport);
    commit('setLoginUser', data);

    return type;
  },

  // async logout({ commit, state }) {
  //   await UserService.logout()
  //   commit('setLoginUser', null)
  // },

  // async register({ commit, state }, passport) {
  //   const {user} = await UserService.register(passport)
  //   commit('setLoginUser', user)
  // },

  // async updateUser({ commit, state }, form) {
  //   const {user} = await UserService.updateUser(form)
  //   commit('setLoginUser', user)
  // },

  // // 搜索api
  // async searchUsers({}, search) {
  //   if(typeof search === 'string') {
  //     search = {
  //       $or: [
  //         {nickname: {$regex: search}},
  //         {name: {$regex: search}}
  //       ]
  //     }
  //   }

  //   return await UserService.searchUsers(search)
  // }
};