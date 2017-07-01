import { createStore, applyMiddleware, compose } from 'redux';
import { autoRehydrate, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../rootReducer';

const middlewares = [thunk];

export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares), autoRehydrate())
  );

  persistStore(store, {
    blacklist: ['context']
  });

  return store;
}
