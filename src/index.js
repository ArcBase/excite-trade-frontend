import React from "react";
import ReactDOM from "react-dom";
import './assets/main.css'
//import 'semantic-ui-css/semantic.min.css'
import './App.css'
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, compose, applyMiddleware, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import { reducer as formReducer } from 'redux-form';

import './assets/home.css'
import authReducer from "./store/reducers/auth";
import cartReducer from "./store/reducers/cart";
import vendorReducer from "./store/reducers/vendor"
import postReducer from "./store/reducers/createPost"

//import postReducer from "./store/reducers/post-r"

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  // cart: cartReducer,
  // vendor: vendorReducer,
  // createProduct: postReducer,
  // formR: formReducer
  //post: postReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
