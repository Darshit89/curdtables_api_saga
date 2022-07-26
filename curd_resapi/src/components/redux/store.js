import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import passengerReducer from "./passengerReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk, logger];

const store = createStore(
  passengerReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export default store;
