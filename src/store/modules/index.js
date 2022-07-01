import { persistCombineReducers } from 'redux-persist';
import app from '@store/modules/app';
import user from '@store/modules/user';
import restaurant from '@store/modules/restaurant';
import order from '@store/modules/order';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['app', 'restaurant', 'order']
};

export default persistCombineReducers(config, {
  app,
  user,
  restaurant,
  order
});
