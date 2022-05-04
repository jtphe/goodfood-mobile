import { persistCombineReducers } from 'redux-persist';
import app from '@store/modules/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

const config = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['app']
};

export default persistCombineReducers(config, {
  app
});
