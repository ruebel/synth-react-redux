import {createStore, applyMiddleware, compose} from 'redux';
import {autoRehydrate, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../rootReducer';

const middlewares = [thunk];

export default function configureStore() {
  const store = createStore(rootReducer, compose(
      applyMiddleware(...middlewares),
      autoRehydrate(),
      window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../rootReducer', () => {
      const nextReducer = require('../rootReducer').default; // eslint-disable-line global-require
      store.replaceReducer(nextReducer);
    });
  }

  persistStore(store, {
    blacklist: ['context']
  });

  return store;
}
