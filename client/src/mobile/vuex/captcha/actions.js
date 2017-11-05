import * as CaptchaService from '../../services/CaptchaService';

export const actions = {
  // 用户api
  async getCaptcha() {
    const { data } = await CaptchaService.getCaptcha();

    return data ? `data:image/png;base64,${data}` : '';
  }
};