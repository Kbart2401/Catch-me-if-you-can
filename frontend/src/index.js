import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';

//Redux Store
import configureStore from './store';
import * as sessionActions from './store/actions/session';
import * as statActions from './store/actions/stats';

//Set initial state
const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
