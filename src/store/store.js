// @flow
import React from 'react';
import type { Node } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import * as storage from 'redux-storage';
import createEngine from 'redux-storage-engine-localstorage';
import combinedReducers from './reducers';

type Props = {
  +children: Node,
}

const reducer = storage.reducer(combinedReducers);
const engine = createEngine('mdp');
const middleware = storage.createMiddleware(engine);

const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);
const store = createStoreWithMiddleware(
  reducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const load = storage.createLoader(engine);
load(store);

const Store = ({ children }: Props) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export default Store;
