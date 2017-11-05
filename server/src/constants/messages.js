// Captcha Service Response
export const NO_NEED_CAPTCHA_VERIFY = {status: 200, message: 'No need to verify captcha.', type: 'NO_NEED_CAPTCHA_VERIFY'};
export const SHOULD_CAPTCHA_VERIFY  = {status: 200, message: 'Should verify captcha.', type: 'SHOULD_CAPTCHA_VERIFY'};

// Captcha Service Error
export const CAPTCHA_IS_EMPTY       = {status: 400, message: 'Captcha cannot be empty.', type: 'CAPTCHA_IS_EMPTY'};
export const CAPTCHA_VERIFY_FAILED  = {status: 400, message: 'Captcha verify failed.', type: 'CAPTCHA_VERIFY_FAILED'};

// User Router Response
export const REQUEST_SUSSESS        = {status: 200, message: 'Request successfully.', type: 'REQUEST_SUSSESS'};