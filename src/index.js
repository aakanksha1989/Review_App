import React from 'react';
import ReactDOM from 'react-dom';
import 'react-app-polyfill/ie11';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './store/reducers/reducer';

const store = createStore(reducer, applyMiddleware(thunk));

const app = (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
ReactDOM.render(app, document.getElementById('root'));

serviceWorker.unregister();
