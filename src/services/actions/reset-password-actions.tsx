export const ALLOW_RESET_PASSWORD = 'ALLOW_RESET_PASSWORD';
export const DENY_RESET_PASSWORD = 'DENY_RESET_PASSWORD';

export const allowResetPassword = () => ({ type: ALLOW_RESET_PASSWORD });
export const denyResetPassword = () => ({ type: DENY_RESET_PASSWORD });
