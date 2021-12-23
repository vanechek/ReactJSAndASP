import { combineReducers } from "redux";
import authReducer from "./reducers/auth.js";
import requestReducer from "./reducers/request.js";

export default combineReducers({
    auth:authReducer,
    request: requestReducer
})