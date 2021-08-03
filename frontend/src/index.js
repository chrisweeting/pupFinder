import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/root';
import reportWebVitals from './reportWebVitals';

document.addEventListener("DOMContentLoaded", () => {
  let store;

  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwt_decode(localStorage.jwtToken);

    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      window.location.href = "/";
    }
  } else {
    store = configureStore({});
  }

  window.getState = store.getState;

  const root = document.getElementById("root");

  ReactDOM.render(<Root store={store} />, root);
});

reportWebVitals();
