import * as CaptchaService from '../../services/CaptchaService';

export const actions = {
  // 用户api
  async getCaptcha({ commit, state }, options) {
    const { data } = await CaptchaService.getCaptcha(options);

    return data ? `data:image/png;base64,${data}` : '';
  }
};