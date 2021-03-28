import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { middleware as reduxPackMiddleware } from 'redux-pack'
import rootReducer from "./reducer";

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, reduxPackMiddleware),
);

export default store;