import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
  U_LOAD_RESTAURANTS,
  M_SET_RESTAURANTS,
  U_LOAD_COMMENTS,
  M_SET_COMMENTS,
  U_SET_FAVORITE_RESTAURANT,
  U_ADD_COMMENT,
  M_ADD_COMMENT,
  U_DELETE_COMMENT,
  M_DELETE_COMMENT
} from '@store/modules/restaurant/actions';
import { M_UPDATE_USER_FAVORITE_RESTAURANT } from '@store/modules/user/actions';
import { getToken } from '@store/modules/user/selectors';
import { getCurrentRestaurant } from '@store/modules/restaurant/selectors';
import { showToast } from '@helpers/showToast';
import Config from 'react-native-config';
import fetchService from '@api/fetchService';
import i18n from '@i18n/i18n';

function* loadRestaurants() {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'get',
      url: `${Config.API_URL}restaurants`,
      headers: {
        token
      }
    };
    const restaurants = yield call(fetchService.request, query);
    yield put({ type: M_SET_RESTAURANTS, restaurants });
  } catch (e) {
    console.log('Error while loading restaurants => ', e);
  }
}

function* loadComments({ payload }) {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'get',
      url: `${Config.API_URL}restaurants/${payload.id}/comments`,
      headers: {
        token
      }
    };
    const comments = yield call(fetchService.request, query);

    yield put({ type: M_SET_COMMENTS, comments });
  } catch (e) {
    console.log('Error while loading comments => ', e);
  }
}

function* setFavoriteRestaurant({ payload }) {
  try {
    const token = yield select(getToken);
    const removeRestaurant = payload.mode === 'remove';
    const query = {
      method: 'put',
      url: `${Config.API_URL}restaurants/${payload.id}/setfavorite`,
      headers: {
        token
      }
    };
    yield call(fetchService.request, query);
    yield put({
      type: M_UPDATE_USER_FAVORITE_RESTAURANT,
      id: removeRestaurant ? null : payload.id
    });
    if (removeRestaurant) {
      showToast(i18n.t('restaurant.removed'), false);
    } else {
      showToast(i18n.t('restaurant.added'), false);
    }
  } catch (e) {
    console.log('Error while setting favorite restaurant => ', e);
  }
}

function* addComment({ payload }) {
  try {
    const token = yield select(getToken);
    const restaurant = yield select(getCurrentRestaurant);
    const query = {
      method: 'post',
      url: `${Config.API_URL}restaurants/${restaurant.id}/comments`,
      headers: {
        token
      },
      data: {
        description: payload.description,
        rating: payload.rating
      }
    };
    const comment = yield call(fetchService.request, query);
    yield put({ type: M_ADD_COMMENT, comment });
    showToast(i18n.t('comments.added'));
  } catch (e) {
    console.log('Error while adding comment => ', e);
  }
}

function* deleteComment({ payload }) {
  try {
    const token = yield select(getToken);
    const query = {
      method: 'delete',
      url: `${Config.API_URL}comments/${payload.id}`,
      headers: {
        token
      }
    };
    const restaurant = yield call(fetchService.request, query);
    yield put({
      type: M_DELETE_COMMENT,
      id: payload.id,
      avg: restaurant.avgRating
    });
    showToast(i18n.t('comments.deleted'));
  } catch (e) {
    console.log('Error while deleting comment => ', e);
  }
}

export default function* watchRestaurant() {
  yield takeLatest(U_LOAD_RESTAURANTS, loadRestaurants);
  yield takeLatest(U_LOAD_COMMENTS, loadComments);
  yield takeLatest(U_SET_FAVORITE_RESTAURANT, setFavoriteRestaurant);
  yield takeLatest(U_ADD_COMMENT, addComment);
  yield takeLatest(U_DELETE_COMMENT, deleteComment);
}
