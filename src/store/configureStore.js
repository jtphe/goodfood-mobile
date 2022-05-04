import { compose, applyMiddleware, createStore } from 'redux';
import { reactotronRedux } from 'reactotron-redux';
import { persistStore } from 'redux-persist';
import rootReducer from '@store/modules';
import rootSagas from '@store/sagas';
import Reactotron from 'reactotron-react-native';
import createSagaMiddleware from 'redux-saga';

Reactotron.configure({ name: 'goodfood-mobile' })
  .use(reactotronRedux())
  .useReactNative();

Reactotron.connect();

export default () => {
  // create the saga middleware
  const sagaMiddleware = createSagaMiddleware();
  // mount it on the Store
  const store = createStore(
    rootReducer,
    compose(Reactotron.createEnhancer(), applyMiddleware(sagaMiddleware))
  );
  // then run the saga
  sagaMiddleware.run(rootSagas);
  const persistor = persistStore(store);
  return { store, persistor };
};
