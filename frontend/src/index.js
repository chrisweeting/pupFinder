import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/root';
import configureStore from './store/store';
import reportWebVitals from './reportWebVitals';

document.addEventListener("DOMContentLoaded", () => {
  let store;

  store = configureStore();

  window.getState = store.getState;

  const root = document.getElementById("root");

  ReactDOM.render(<Root store={store} />, root);
});

reportWebVitals();