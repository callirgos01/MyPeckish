/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReduxers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './app/reducers';
import AppContainer from './app/containers/AppContainer'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './app/sagas'

const loggerMiddleware = createLogger({predicate:(getState, action) => __DEV__ });
const sagaMiddleware = createSagaMiddleware()

function configureStore(initialState) {
  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware,
      sagaMiddleware
    ),
  );
  return createStore(reducer, initialState, enhancer);
}

//isomorphic web app will need an initial state
const store = configureStore({});
sagaMiddleware.run(rootSaga);

import {
  AppRegistry,
} from 'react-native';

const App = () => (
  <Provider store={store}>
  <AppContainer />
  </Provider>
);

AppRegistry.registerComponent('Peckish', () => App);
