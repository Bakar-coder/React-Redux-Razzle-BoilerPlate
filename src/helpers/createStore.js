import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import Reducer from "../store/reducers";
import axios from "axios";
const initialState = {};

export default req => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api", // add your backend server api here
    headers: { token: req.get("x-auth-token") || "" } // get the token sent from api server
  });
  const { withExtraArgument } = thunk;
  const middleware = [withExtraArgument(axiosInstance)];
  const store = createStore(
    Reducer,
    initialState,
    applyMiddleware(...middleware)
  );

  return store;
};
