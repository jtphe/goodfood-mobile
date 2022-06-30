export const U_SIGN_UP = 'U_SIGN_UP';
export const M_RESET_USER_STORE = 'M_RESET_USER_STORE';
export const M_SET_USER = 'M_SET_USER';
export const U_SIGN_IN = 'U_SIGN_IN';
export const M_UPDATE_USER_FAVORITE_RESTAURANT =
  'M_UPDATE_USER_FAVORITE_RESTAURANT';

export const signUp = ({ payload }) => ({
  type: U_SIGN_UP,
  payload
});

export const signIn = ({ payload }) => ({ type: U_SIGN_IN, payload });
