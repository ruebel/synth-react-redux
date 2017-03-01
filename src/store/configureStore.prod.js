import {createStore, applyMiddleware, compose} from 'redux';
import {autoRehydrate, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const middlewares = [thunk];

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(
      applyMiddleware(...middlewares),
      autoRehydrate()
    )
  );

  persistStore(store, {
    blacklist: ['context']
  });

  return store;
}
