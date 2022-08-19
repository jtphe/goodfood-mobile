export const M_RESET_RESTAURANT_STORE = 'M_RESET_RESTAURANT_STORE';
export const U_LOAD_RESTAURANTS = 'U_LOAD_RESTAURANTS';
export const M_SET_RESTAURANTS = 'M_SET_RESTAURANTS';
export const U_LOAD_COMMENTS = 'U_LOAD_COMMENTS';
export const M_SET_COMMENTS = 'M_SET_COMMENTS';
export const M_SET_CURRENT_RESTAURANT = 'M_SET_CURRENT_RESTAURANT';
export const U_SET_FAVORITE_RESTAURANT = 'U_SET_FAVORITE_RESTAURANT';
export const U_ADD_COMMENT = 'U_ADD_COMMENT';
export const M_ADD_COMMENT = 'M_ADD_COMMENT';
export const U_DELETE_COMMENT = 'U_DELETE_COMMENT';
export const M_DELETE_COMMENT = 'M_DELETE_COMMENT';
export const M_RESET_CURRENT_RESTAURANT = 'M_RESET_CURRENT_RESTAURANT';

export const resetCurrentRestaurant = () => ({
  type: M_RESET_CURRENT_RESTAURANT
});

export const loadRestaurants = () => ({
  type: U_LOAD_RESTAURANTS
});

export const loadComments = ({ payload }) => ({
  type: U_LOAD_COMMENTS,
  payload
});

export const setCurrentRestaurant = ({ payload }) => ({
  type: M_SET_CURRENT_RESTAURANT,
  payload
});

export const setFavoriteRestaurant = ({ payload }) => ({
  type: U_SET_FAVORITE_RESTAURANT,
  payload
});

export const addComment = ({ payload }) => ({
  type: U_ADD_COMMENT,
  payload
});

export const deleteComment = ({ payload }) => ({
  type: U_DELETE_COMMENT,
  payload
});
