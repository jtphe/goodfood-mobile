export const U_LOG_OUT = 'U_LOG_OUT';
export const M_RESET_APP_STORE = 'M_RESET_APP_STORE';

export const logout = ({ payload }) => ({
  type: U_LOG_OUT,
  payload
});
