import * as UserService from '../../services/UserService';

export const actions = {
  // 用户api
  async getSession({ commit, state }) {
    const { data, type } = await UserService.getSessionUser();
    commit('setLoginUser', data);

    return type;
  },

  async signin({ commit, state }, passport) {
    const { data, type } = await UserService.signin(passport);
    commit('setLoginUser', data);

    return type;
  },

  async signout({ commit, state }) {
    const { data, type } = await UserService.signout();
    commit('setLoginUser', data);

    return type;
  },

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