import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// Bootstrap, MDB, fonts, other style libraries
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only';
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Router
import { BrowserRouter as Router } from "react-router-dom";

// Redux
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import logger from "redux-logger";

import Auth0ProviderWithContext from "./auth/Auth0ProviderWithContext";

import * as serviceWorker from "./serviceWorker";

import rootReducer from "./store/reducers";

// Redux dev tools
const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(thunk, logger),
    // other store enhancers if any
);
const store = createStore(rootReducer, enhancer);

const rootElement = document.getElementById("root");

ReactDOM.render(
  <Router>
    <Auth0ProviderWithContext>
      <Provider store={store}>
        <App />
      </Provider>
    </Auth0ProviderWithContext>
  </Router>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
