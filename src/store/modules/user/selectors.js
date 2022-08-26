export const getToken = (state) => state.user.token;
export const getUser = (state) => state.user.user;
export const getUserFavoriteRestaurant = (state) => state.user.user?.restaurant;
export const getUserAddress = (state) => state.user.user.address;
export const getUserPostalCode = (state) => state.user.user.postalcode;
export const getUserCity = (state) => state.user.user.city;
